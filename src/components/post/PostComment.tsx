import { CloseRounded } from '@mui/icons-material';
import { Avatar, CircularProgress, IconButton, List, Stack, Typography } from '@mui/material';
import { useAppSelector } from '~/app/hooks';
import { ContainedInput } from '~/components/common';
import { CommentItemSkeleton } from '~/components/skeletons';
import { selectCurrentUser } from '~/redux/slices/userSlice';
import { selectCommentLoading } from '~/redux/slices/commentSlice';
import { useSubmitWithEnter } from '~/hooks';
import { Comment, CommentActionTypes } from '~/models';
import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { showErrorToastFromServer } from '~/utils/toast';
import { CommentItem } from './CommentItem';

export interface PostCommentProps {
  commentList: Comment[];
  postId: string;
  onClose?: () => void;
  updateCommentCount?: (count: number) => void;
  onCommentAction?: (action: CommentActionTypes, comment: Comment) => void;
}

export function PostComment(props: PostCommentProps) {
  const { commentList, postId, onClose, updateCommentCount, onCommentAction } = props;

  const { t } = useTranslation('postComment');

  const loading = useAppSelector(selectCommentLoading);
  const currentUser = useAppSelector(selectCurrentUser);

  const inputRef = useRef<HTMLInputElement>();
  const [input, setInput] = useState<string>('');

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  useEffect(() => {
    updateCommentCount?.(commentList.length);
  }, [commentList.length]);

  const handleInputChange = (e: any) => {
    setInput(e.target.value);
  };

  const handleSubmitComment = async () => {
    setInput('');

    try {
      const comment: Comment = {
        postId,
        userId: currentUser?._id!,
        content: input.trim(),
      };

      await onCommentAction?.('create', comment);
    } catch (error) {
      showErrorToastFromServer(error);
    }

    inputRef.current?.focus();
  };

  const onKeyUp = useSubmitWithEnter(handleSubmitComment);

  return (
    <Stack
      direction="column"
      sx={{
        width: '100vw',
        maxWidth: 680,
        height: '100vh',
        bgcolor: 'background.paper',
      }}
    >
      <Stack direction="column" px={{ xs: 3, sm: 5 }}>
        <IconButton
          onClick={onClose}
          sx={{
            width: 'fit-content',
            ml: 'auto',
            my: 3,
          }}
        >
          <CloseRounded />
        </IconButton>

        <Typography
          fontSize={18}
          fontWeight={600}
          sx={{
            display: 'flex',
            alignItems: 'center',
            cursor: 'default',
          }}
        >
          {loading ? <CircularProgress size={20} sx={{ mr: 1 }} /> : commentList.length || 0}
          {t(`comment${commentList.length > 1 ? 's' : ''}`)}
        </Typography>

        <Stack alignItems="center" mt={6} mb={3}>
          <Avatar
            src={currentUser?.avatar}
            sx={{
              width: 36,
              height: 36,
              flexGrow: 0,
              mr: 2,
            }}
          />

          <ContainedInput
            size="small"
            inputRef={inputRef}
            placeholder={t('placeholder')}
            fullWidth
            autoFocus
            value={input}
            onSubmit={handleSubmitComment}
            onChange={handleInputChange}
            onKeyUp={onKeyUp}
          />
        </Stack>
      </Stack>

      <List
        className="default-scrollbar"
        sx={{
          flexGrow: 1,
          overflowY: 'auto',
          px: { xs: 3, sm: 5 },
          py: 0,
        }}
      >
        {loading ? (
          <CommentItemSkeleton />
        ) : (
          commentList?.map((comment) => (
            <CommentItem key={comment._id} comment={comment} onCommentAction={onCommentAction} />
          ))
        )}
      </List>
    </Stack>
  );
}
