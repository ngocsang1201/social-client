import { NotificationsRounded } from '@mui/icons-material';
import {
  Avatar,
  Backdrop,
  Box,
  Hidden,
  IconButton,
  MenuItem,
  Stack,
  Typography,
} from '@mui/material';
import { useAppSelector } from 'app/hooks';
import { selectCurrentUser } from 'features/auth/authSlice';
import React, { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { formatTime } from 'utils/common';
import theme, { themeConstants } from 'utils/theme';
import { PopperMenu } from '..';

export default function Notification() {
  const currentUser = useAppSelector(selectCurrentUser);

  const [openMenu, setOpenMenu] = useState(false);
  const anchorRef = useRef<HTMLElement | null>(null);

  const toggleMenu = () => setOpenMenu(!openMenu);
  const closeMenu = () => setOpenMenu(false);

  return (
    <>
      <IconButton
        ref={anchorRef as any}
        onClick={toggleMenu}
        sx={{
          mr: 2,
          color: 'text.secondary',
          fontSize: 18,

          ':hover': {
            backgroundColor: 'transparent',
            color: 'text.primary',
          },
        }}
      >
        <NotificationsRounded />
      </IconButton>

      <Hidden smUp>
        <Backdrop open={openMenu} sx={{ zIndex: (theme) => theme.zIndex.appBar + 1 }}></Backdrop>
      </Hidden>

      <PopperMenu
        open={openMenu}
        anchorEl={anchorRef.current}
        paperSx={{
          width: { xs: '100vw', sm: 400 },
          mt: 2,
          py: { xs: 2, sm: 0 },
          boxShadow: themeConstants.boxShadow,
          borderRadius: { xs: 4, sm: 1 },
        }}
        zIndex={theme.zIndex.appBar + 1}
        onClose={closeMenu}
      >
        <Stack direction="row" alignItems="center" justifyContent="space-between" px={2} py={1}>
          <Typography variant="h6" fontWeight="500" sx={{ userSelect: 'none', cursor: 'default' }}>
            Thông báo
          </Typography>

          <Typography
            variant="body1"
            fontSize={14}
            sx={{
              transition: 'easing.easeInOut',
              userSelect: 'none',
              cursor: 'pointer',

              ':hover': {
                color: 'primary.main',
              },
            }}
          >
            Đánh dấu tất cả là đã đọc
          </Typography>
        </Stack>

        <Box p={0.8}>
          <Link to="/blog">
            <MenuItem sx={{ borderRadius: 1 }} onClick={closeMenu}>
              <Avatar src={currentUser?.avatar} sx={{ width: 48, height: 48, mr: 2 }} />

              <Box flexGrow={1}>
                <Typography variant="body1" mb={0.5} whiteSpace="normal">
                  Chào mừng&nbsp;
                  <Typography component="span" fontWeight="500">
                    {currentUser?.name}
                  </Typography>
                  &nbsp;đến với Blog.
                </Typography>

                <Typography variant="subtitle2" fontWeight="400">
                  {formatTime(currentUser?.createdAt)}
                </Typography>
              </Box>
            </MenuItem>
          </Link>
        </Box>
      </PopperMenu>
    </>
  );
}
