import { isTheme, style } from '../styles/Theme';

export const Logo = (): HTMLAnchorElement => {
  const logo = document.createElement('a');
  logo.href = '/';
  logo.innerText = 'FEDS';
  logo.style.color = style(['black_80', isTheme('light')], ['white_50', isTheme('dark')]);
  logo.style.textDecoration = 'none';
  logo.style.padding = '10px 20px';
  logo.style.fontSize = '24px';
  return logo;
};
