export const startRoute = () => '/';
export const typesRoute = () => '/types';
export const atomsRoute = () => '/atoms';
export const elementsRoute = () => '/elements';
export const compoenntsRoute = () => '/components';
export const changeRoute = (route: string) =>
  (window.location.href = '/#' + route);
