import { CloseRounded, SearchRounded } from '@mui/icons-material';
import {
  Avatar,
  Box,
  CircularProgress,
  Divider,
  Grow,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  Paper,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { ChangeEvent, createRef, useEffect, useMemo, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { postApi, userApi } from '~/api';
import { useDebounce, useKeyUp } from '~/hooks';
import { Post, SearchApiType, SearchResult, User } from '~/models';
import { formatSearchResponse } from '~/utils/common';
import { themeMixins } from '~/utils/theme';
import { showErrorToastFromServer } from '~/utils/toast';

const MAX_ITEM = 5;

export function SearchBoxDesktop() {
  const navigate = useNavigate();

  const { t } = useTranslation('header');

  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<SearchResult[]>([]);
  const [focused, setFocused] = useState(false);

  const debouncedInput = useDebounce(input, 700);

  const inputRef = useRef<any>(null);

  const searchType = useMemo(() => {
    return debouncedInput.startsWith('@') ? 'users' : 'posts';
  }, [debouncedInput]);

  const isMore = useMemo(() => results.length > MAX_ITEM, [results]);

  useEffect(() => {
    if (debouncedInput.length < 1) return;

    (async () => {
      try {
        let api: SearchApiType = postApi;
        let q = debouncedInput;

        if (debouncedInput.startsWith('@')) {
          api = userApi;
          q = debouncedInput.slice(1);
        }

        const response = await api.search(q);
        setResults(formatSearchResponse(response));
      } catch (error) {
        showErrorToastFromServer(error);
      }

      setLoading(false);
    })();
  }, [debouncedInput]);

  const clearSearchInput = () => setInput('');

  const gotoSearchPage = () => {
    const value = searchType === 'users' ? input.slice(1) : input;
    if (!value) return;

    navigate(`/search/${searchType}?q=${value}`);
    inputRef.current.blur();
  };

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setLoading(true);
    setResults([]);
    setInput(e.target.value);
  };

  const goto = (url: string) => {
    clearSearchInput();
    navigate(url);
  };

  const onKeyUp = useKeyUp('Enter', gotoSearchPage);

  return (
    <Box
      display={{ xs: 'none', sm: 'block' }}
      sx={{
        width: '100%',
        maxWidth: 320,
        position: { xs: 'relative', md: 'absolute' },
        top: { md: '50%' },
        left: { md: '50%' },
        transform: { md: 'translate(-50%, -50%)' },
      }}
    >
      <TextField
        placeholder={t('search.placeholder')}
        inputProps={{
          ref: inputRef,
          onFocus: () => setFocused(true),
          onBlur: () => setFocused(false),
        }}
        value={input}
        onChange={handleSearchChange}
        onKeyUp={onKeyUp}
        fullWidth
        size="small"
        InputProps={{
          startAdornment: <SearchRounded sx={{ color: 'action.disabled', mr: 1.5 }} />,
          endAdornment: input.length > 0 && (
            <IconButton sx={{ color: 'text.secondary' }} onClick={clearSearchInput}>
              <CloseRounded />
            </IconButton>
          ),
        }}
      />

      <Grow in={focused && !!input}>
        <Paper
          sx={{
            ...themeMixins.paperBorder(),
            position: 'absolute',
            inset: '100% 0 auto',
            top: '100%',
            maxHeight: 450,
            mt: 1,
            overflow: 'auto',
          }}
        >
          <Stack alignItems="center" px={2} py={1}>
            {loading ? (
              <CircularProgress size={20} />
            ) : (
              <Typography variant="subtitle2" color="text.secondary">
                {t(`search.${searchType}.result${results.length > 1 ? 's' : ''}`, {
                  count: results.length,
                  q: input,
                })}
              </Typography>
            )}
          </Stack>

          {results.length > 0 && <Divider />}

          <List disablePadding>
            {input.length > 0 &&
              results.slice(0, MAX_ITEM).map((data) => (
                <ListItem key={data._id} disablePadding>
                  <ListItemButton disableRipple onClick={() => goto(data.url)}>
                    <Stack alignItems="center">
                      <Avatar
                        src={data.image}
                        sx={{
                          width: 32,
                          height: 32,
                          mr: 1,
                          bgcolor: !data.image ? 'action.disabled' : undefined,
                        }}
                      >
                        {data.title[0]}
                      </Avatar>

                      <Typography
                        variant="subtitle1"
                        fontWeight={500}
                        sx={{ ...themeMixins.truncate(1) }}
                      >
                        {data.title}
                      </Typography>
                    </Stack>
                  </ListItemButton>
                </ListItem>
              ))}

            {isMore && (
              <>
                <Divider />

                <Stack>
                  <Typography
                    variant="subtitle2"
                    color="text.secondary"
                    onClick={gotoSearchPage}
                    sx={{
                      display: 'inline-block',
                      textAlign: 'center',
                      mx: 'auto',
                      py: 0.8,
                      cursor: 'pointer',
                      '&:hover': {
                        color: 'text.primary',
                      },
                    }}
                  >
                    {t('search.viewMore')}
                  </Typography>
                </Stack>
              </>
            )}
          </List>
        </Paper>
      </Grow>
    </Box>
  );
}
