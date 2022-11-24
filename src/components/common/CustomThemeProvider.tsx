import { Theme, ThemeProvider } from '@mui/material';
import { useAppSelector } from 'app/hooks';
import favicons from 'assets/favicons';
import { selectUserConfig } from 'features/auth/userSlice';
import i18next from 'i18next';
import { SnackbarProvider } from 'notistack';
import { ReactNode, useEffect, useState } from 'react';
import { ToastContainer } from 'react-toastify';
import { configTheme, themeVariables } from 'utils/theme';
import 'react-toastify/dist/ReactToastify.min.css';

export interface CustomThemeProviderProps {
  children: ReactNode;
}

export function CustomThemeProvider({ children }: CustomThemeProviderProps) {
  const { mode, mainColor, language } = useAppSelector(selectUserConfig);

  const [theme, setTheme] = useState<Theme>(configTheme(mode, mainColor));

  useEffect(() => {
    setTheme(configTheme(mode, mainColor));
  }, [mode, mainColor]);

  useEffect(() => {
    const faviconElement = document.getElementById('favicon') as HTMLLinkElement;
    faviconElement.href = favicons[mainColor] ?? favicons['#000000'];
    document.documentElement.style.setProperty('--color-primary', mainColor);
  }, [mainColor]);

  useEffect(() => {
    i18next.changeLanguage(language);
  }, [language]);

  return (
    <ThemeProvider theme={theme}>
      <SnackbarProvider
        maxSnack={3}
        autoHideDuration={3000}
        preventDuplicate
        style={{
          color: theme.palette.common.white,
          backgroundColor: theme.palette.primary.main,
          cursor: 'pointer',
        }}
      >
        {children}
      </SnackbarProvider>

      <ToastContainer
        theme={mode}
        autoClose={2000}
        style={{ top: themeVariables.headerHeight }}
        toastStyle={{ backgroundColor: theme.palette.background.paper }}
      />
    </ThemeProvider>
  );
}