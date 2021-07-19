import { DesignSystem } from 'src/application/pages/DesignSystem';
import { Home } from 'src/application/pages/Home';
import { PAGES } from './config';

export const Route = () => {
  const params: URLSearchParams = new URLSearchParams(window.location.search);
  const page = params.get('page');
  if (page === PAGES.HOME || !page) new Home({});
  if (page === PAGES.DESIGN) new DesignSystem({ section: DesignSystem.getSectionByString(params.get('section')) });
};
