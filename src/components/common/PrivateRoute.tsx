import { LocalStorageKey } from 'constants/common';
import Chat from 'features/chat';
import { Navigate } from 'react-router-dom';

export interface PrivateRouteProps {
  children: React.ReactNode;
  hideChat?: boolean;
}

export function PrivateRoute(props: PrivateRouteProps) {
  const { children, hideChat } = props;

  const isAuth = localStorage.getItem(LocalStorageKey.ACCESS_TOKEN);

  return isAuth ? (
    <>
      {children}
      {!hideChat && <Chat />}
    </>
  ) : (
    <Navigate to="/login" />
  );
}
