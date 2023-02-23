import { Theme, ThemeProvider } from '@mui/material';
import i18next from 'i18next';
import { ReactNode, useEffect, useState } from 'react';
import { ToastContainer } from 'react-toastify';
import { useAppSelector } from '~/store/hooks';
import favicons from '~/assets/favicons';
import { selectUserConfig } from '~/store/slices/userSlice';
import { configTheme, themeVariables } from '~/utils/theme';
import { env, variables } from '~/utils/env';
import 'react-toastify/dist/ReactToastify.min.css';

export interface CustomThemeProviderProps {
  children: ReactNode;
}

export function CustomThemeProvider({ children }: CustomThemeProviderProps) {
  const { mode, mainColor, language } = useAppSelector(selectUserConfig);

  const [theme, setTheme] = useState<Theme>(configTheme(mode, mainColor));

  useEffect(() => {
    setTheme(configTheme(mode, mainColor));

    if (env(variables.environment) === 'development') {
      console.log(theme);
    }
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
      {children}

      <ToastContainer
        theme={mode}
        autoClose={2000}
        style={{ top: themeVariables.headerHeight }}
        toastStyle={{ backgroundColor: theme.palette.background.paper }}
      />
    </ThemeProvider>
  );
}
