import { MainMenu } from './elements/Menus';
import { ShellMain } from './elements/Shells';
import dom, { Dom } from './lib/dom';
import Atoms from './pages/Atoms';
import Components from './pages/Components';
import Elements from './pages/Elements';
import Start from './pages/Start';
import Types from './pages/Types';
import {
  atomsRoute,
  compoenntsRoute,
  elementsRoute,
  typesRoute,
} from './routes';

const render = (root: Dom) => {
  const route = window.location.hash.replace('#', '');
  const content: Dom = dom();
  const shell: HTMLElement = ShellMain({
    menu: MainMenu(),
    content: content.el,
  });
  root.swap(shell);
  if (route === '') new Start(content).render();
  if (route === typesRoute()) new Types(content).render();
  if (route === atomsRoute()) new Atoms(content).render();
  if (route === elementsRoute()) new Elements(content).render();
  if (route === compoenntsRoute()) new Components(content).render();
};

window.addEventListener('DOMContentLoaded', () => {
  const root: Dom = dom();
  document.querySelector('#root').appendChild(root.el);
  window.addEventListener('hashchange', () => render(root));
  render(root);
});
