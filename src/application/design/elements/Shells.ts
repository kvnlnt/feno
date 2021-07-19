import { Logo } from './Logo';
import { SiteNav } from './Navigation';
import { ThemePicker } from './Pickers';
import { H1 } from './Typography';

export const DashboardShell = ({ menu, content }: { menu: HTMLElement; content: HTMLElement }): HTMLDivElement => {
  customElements.define('site-nav', SiteNav);

  // Grid
  const grid = document.createElement('div');
  grid.style.display = 'grid';
  grid.style.gridTemplateAreas = '"logo user" "nav nav" "menu content"';
  grid.style.gridTemplateRows = 'max-content min-content min-content';
  grid.style.gridTemplateColumns = 'max-content';
  grid.style.height = '100vh';

  // Logo
  const logo = Logo();
  const logoArea = document.createElement('div');
  logoArea.style.gridArea = 'logo';
  logoArea.style.display = 'flex';
  logoArea.style.justifyContent = 'flex-start';
  logoArea.style.alignItems = 'center';
  logoArea.appendChild(logo);
  grid.appendChild(logoArea);

  // User Area
  const user = H1('USER');
  const themePicker = ThemePicker();
  const userArea = document.createElement('div');
  userArea.style.gridArea = 'user';
  userArea.style.flexDirection = 'row';
  userArea.style.justifyContent = 'flex-end';
  userArea.style.display = 'flex';
  userArea.style.alignItems = 'center';
  userArea.appendChild(themePicker);
  userArea.appendChild(user);
  grid.appendChild(userArea);

  // Nav Area
  const nav = document.createElement('site-nav');
  const navArea = document.createElement('div');
  navArea.style.gridArea = 'nav';
  navArea.appendChild(nav);
  grid.appendChild(navArea);

  // Menu Area
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

export const DashboardHomeShell = ({ content }: { content: HTMLElement }): HTMLDivElement => {
  customElements.define('site-nav', SiteNav);

  // Grid
  const grid = document.createElement('div');
  grid.style.display = 'grid';
  grid.style.gridTemplateAreas = '"logo user" "nav nav" "content content"';
  grid.style.gridTemplateRows = 'max-content min-content min-content';
  grid.style.gridTemplateColumns = 'max-content';
  grid.style.height = '100vh';

  // Logo
  const logo = Logo();
  const logoArea = document.createElement('div');
  logoArea.style.gridArea = 'logo';
  logoArea.style.display = 'flex';
  logoArea.style.justifyContent = 'flex-start';
  logoArea.style.alignItems = 'center';
  logoArea.appendChild(logo);

  grid.appendChild(logoArea);

  // User Area
  const user = H1('USER');
  const themePicker = ThemePicker();
  const userArea = document.createElement('div');
  userArea.style.gridArea = 'user';
  userArea.style.flexDirection = 'row';
  userArea.style.justifyContent = 'flex-end';
  userArea.style.display = 'flex';
  userArea.style.alignItems = 'center';
  userArea.appendChild(themePicker);
  userArea.appendChild(user);
  grid.appendChild(userArea);

  // Nav Area
  const nav = document.createElement('site-nav');
  const navArea = document.createElement('div');
  navArea.style.gridArea = 'nav';
  navArea.appendChild(nav);
  grid.appendChild(navArea);

  // Content Area
  const contentArea = document.createElement('div');
  contentArea.style.gridArea = 'content';
  contentArea.appendChild(content);
  grid.appendChild(contentArea);

  return grid;
};
