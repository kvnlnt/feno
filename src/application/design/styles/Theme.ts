import { LOCAL_STORAGE, ROOT } from 'src/adaptors/config';
import { palette } from './Palette';

const Themes = {
  dark: 'dark',
  light: 'light',
};

export const style = (...styleList: [keyof typeof palette, ...boolean[]][]): string => {
  const filteredStyles = styleList.filter((item) => item.slice(1, item.length).every((check) => check));
  const keys = filteredStyles.map((item) => item[0]);
  const values = keys.map((s) => palette[s]).join(';');
  return values;
};

export const isTheme = (theme: keyof typeof Themes) => theme === getTheme();

export const getTheme = () => localStorage.getItem(LOCAL_STORAGE.THEME);

export const setTheme = (theme: keyof typeof Themes) => {
  Object.entries(Themes).forEach(([k]) => document.body.classList.remove(k));
  localStorage.setItem(LOCAL_STORAGE.THEME, theme);
  document.body.classList.add(theme);
};

export const Theme = (theme: keyof typeof Themes = 'dark') => {
  const body = document.body;
  body.style.margin = '0px';
  const root = document.createElement('div');
  root.id = ROOT;
  root.style.backgroundColor = style(['black_05', isTheme('light')], ['black_90', isTheme('dark')]);
  root.style.color = style(['black_100', isTheme('light')], ['white_80', isTheme('dark')]);
  root.style.fontFamily = 'Arial';
  document.body.appendChild(root);
  setTheme(<keyof typeof Themes>localStorage.getItem(LOCAL_STORAGE.THEME) || theme);
};
