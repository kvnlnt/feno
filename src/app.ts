import { route } from './adaptors/router';
import { Styles } from './application/design/styles/Theme';

window.addEventListener('DOMContentLoaded', () => {
  Styles({ theme: 'dark' });
  route();
});
