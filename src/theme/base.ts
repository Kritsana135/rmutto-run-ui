import { Theme } from '@mui/material';
import { PureLightTheme } from './schemes/PureLightTheme';

export function themeCreator(theme: string): Theme {
  return themeMap[theme];
}

const themeMap: { [key: string]: Theme } = {
  PureLightTheme
};
