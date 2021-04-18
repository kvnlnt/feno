import { Store } from './lib/store';

enum States {
  Global = 'Global',
  StartPage = 'StartPage',
  TypesPage = 'TypesPage',
}

export const globalState = Store<{
  themeName: string;
  themePrefix: string;
}>(States.Global, {
  themeName: '',
  themePrefix: '',
});

export const startPageState = Store<{
  themeName: string;
  themePrefix: string;
}>(States.StartPage, {
  themeName: 'Night',
  themePrefix: 'ngt',
});

export const typesPageState = Store<{
  types: string[];
  newType: string;
}>(States.TypesPage, {
  types: ['happy', 'calm', 'cautious', 'alarmed'],
  newType: '',
});
