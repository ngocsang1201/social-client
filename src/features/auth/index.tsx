import queryString from 'query-string';
import { useLocation } from 'react-router-dom';
import ActiveAccount from './components/ActiveAccount';
import AuthLayout from './components/AuthLayout';
import { NewPassword } from './components/NewPassword';

export type AuthModeTypes = 'login' | 'register';
export interface AuthPageProps {
  mode: AuthModeTypes | 'active' | 'createPassword' | 'resetPassword';
}

export default function Auth({ mode }: AuthPageProps) {
  const location = useLocation();
  const activeToken = queryString.parse(location.search)?.token as string;

  switch (mode) {
    case 'login':
    case 'register': {
      return <AuthLayout mode={mode} />;
    }

    case 'active': {
      return <ActiveAccount token={activeToken} />;
    }

    case 'createPassword':
    case 'resetPassword': {
      return <NewPassword token={activeToken} mode={mode} />;
    }

    default: {
      return null;
    }
  }
}
