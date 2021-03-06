import { userApi } from 'api';
import { useAppDispatch } from 'app/hooks';
import { CustomScrollbar, NotFound, PrivateRoute } from 'components/common';
import Auth from 'features/auth';
import { authActions } from 'features/auth/authSlice';
import Blog from 'features/blog';
import ProfilePage from 'features/profile';
import Settings from 'features/settings';
import SocketClient from 'features/socket';
import { socketActions } from 'features/socket/socketSlice';
import { IUser } from 'models';
import { useEffect } from 'react';
import { Navigate, Route, Routes, useNavigate } from 'react-router-dom';
import { io } from 'socket.io-client';
import { ACCESS_TOKEN } from 'utils/constants';
import { env, variables } from 'utils/env';
import { showErrorToast } from 'utils/toast';

function App() {
  const navigate = useNavigate();

  const dispatch = useAppDispatch();

  useEffect(() => {
    (async () => {
      try {
        const token = localStorage.getItem(ACCESS_TOKEN) || '';
        if (!token) return;

        const user = await userApi.getCurrentUser();
        if (!user) throw new Error();

        dispatch(authActions.setCurrentUser(user as unknown as IUser));
      } catch (error) {
        showErrorToast(error);
        dispatch(authActions.logout({ navigate }));
      }
    })();
  }, [dispatch]);

  useEffect(() => {
    const socket = io(env(variables.serverUrl));
    if (!socket) return;

    dispatch(socketActions.setSocket(socket));

    return () => {
      socket.close();
    };
  }, [dispatch]);

  return (
    <CustomScrollbar>
      <SocketClient />

      <Routes>
        <Route path="/" element={<Navigate to="/blog" replace={true} />} />

        <Route
          path="/blog/*"
          element={
            <PrivateRoute>
              <Blog />
            </PrivateRoute>
          }
        />

        <Route
          path="/settings/*"
          element={
            <PrivateRoute>
              <Settings />
            </PrivateRoute>
          }
        />

        <Route path="/login" element={<Auth mode="login" />} />
        <Route path="/register" element={<Auth mode="register" />} />
        <Route path="/active" element={<Auth mode="active" />} />
        <Route path="/reset-password" element={<Auth mode="resetPassword" />} />
        <Route path="/create-password" element={<Auth mode="createPassword" />} />

        <Route
          path="user/:username"
          element={
            <PrivateRoute>
              <ProfilePage />
            </PrivateRoute>
          }
        />

        <Route
          path="*"
          element={
            <PrivateRoute hideChat>
              <NotFound showHeader />
            </PrivateRoute>
          }
        />
      </Routes>
    </CustomScrollbar>
  );
}

export default App;
