export const startRoute = () => '/';
export const typesRoute = () => '/types';
export const atomsRoute = () => '/atoms';
export const elementsRoute = () => '/elements';
export const componentsRoute = () => '/components';
export const changeRoute = (route: string) =>
  (window.location.href = '/#' + route);
