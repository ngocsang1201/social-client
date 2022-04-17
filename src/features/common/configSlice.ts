import { PaletteMode } from '@mui/material';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from 'app/store';
import { SupportedLanguage, SupportedThemeColor, UserConfig } from 'models';
import { localConfig } from 'utils/common';

export type ConfigKey = keyof UserConfig;

interface ConfigState extends UserConfig {
  showConfig: boolean;
}

const initialState: ConfigState = {
  showConfig: false,
  theme: 'light',
  color: '#7575FF',
  lang: 'vi',
  ...localConfig.get(),
};

const configSlice = createSlice({
  name: 'config',
  initialState,
  reducers: {
    setShowConfig: (state, action: PayloadAction<boolean>) => {
      state.showConfig = action.payload;
    },
    changeThemeMode(state, action: PayloadAction<PaletteMode>) {
      state.theme = action.payload;
      localConfig.setProperty('theme', action.payload);
    },
    changeThemeColor(state, action: PayloadAction<SupportedThemeColor>) {
      state.color = action.payload;
      localConfig.setProperty('color', action.payload);
    },
    changeLanguage(state, action: PayloadAction<SupportedLanguage>) {
      state.lang = action.payload;
      localConfig.setProperty('lang', action.payload);
    },
  },
});

export const configActions = configSlice.actions;

export const selectShowConfig = (state: RootState) => state.config.showConfig;
export const selectThemeMode = (state: RootState) => state.config.theme;
export const selectThemeColor = (state: RootState) => state.config.color;
export const selectLanguage = (state: RootState) => state.config.lang;

const configReducer = configSlice.reducer;
export default configReducer;