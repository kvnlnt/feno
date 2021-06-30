import { SiteMenu } from './Menus';
import { H1 } from './Typography';

interface Shell {
  content: HTMLElement;
}

export const ShellMain = ({ content }: Shell): HTMLDivElement => {
  // Grid
  const grid = document.createElement('div');
  grid.style.display = 'grid';
  grid.style.gridTemplateAreas = '"logo user" "menu content"';
  grid.style.gridTemplateRows = 'max-content';
  grid.style.gridTemplateColumns = 'max-content';
  grid.style.height = '100vh';

  // Logo
  const logo = H1('LOGO');
  const logoArea = document.createElement('div');
  logoArea.style.gridArea = 'logo';
  logoArea.appendChild(logo);
  grid.appendChild(logoArea);

  // User Menu Area
  const user = H1('USER');
  const userArea = document.createElement('div');
  userArea.style.gridArea = 'user';
  userArea.appendChild(user);
  grid.appendChild(userArea);

  // Menu Area
  const menu = SiteMenu();
  const menuArea = document.createElement('div');
  menuArea.style.gridArea = 'menu';
  menuArea.appendChild(menu);
  grid.appendChild(menuArea);

  // Content Area
  const contentArea = document.createElement('div');
  contentArea.style.gridArea = 'content';
  contentArea.appendChild(content);
  grid.appendChild(contentArea);

  return grid;
};
