import { MoodEntity } from './entities/MoodEntity';
import { dom, Dom } from './lib/dom';
import { StartPage } from './pages/StartPage';
import { Types } from './pages/Types/fsm';

const render = (root: Dom) => {
  const route = window.location.hash.replace('#', '');
  if (route === '') root.swap(StartPage());
  if (route === '/types')
    new Types({
      root,
      moodStore: new MoodEntity({
        types: ['happy', 'calm', 'cautious', 'alarmed'],
        newType: '',
        deleteType: '',
      }),
    });
};

window.addEventListener('DOMContentLoaded', () => {
  const root: Dom = dom();
  document.querySelector('#root').appendChild(root.el);
  window.addEventListener('hashchange', () => render(root));
  render(root);
});
