import { Store } from './lib/store';

enum States {
  App = 'App',
  Theme = 'Theme',
  Moods = 'Moods',
}

export const appState = Store<{
  theme: {
    name: string;
    prefix: string;
  };
}>(States.App, {
  theme: {
    name: 'Night',
    prefix: 'ngt',
  },
});

export const themeState = Store<{
  name: string;
  prefix: string;
}>(States.Theme, {
  name: 'Night',
  prefix: 'ngt',
});

export interface MoodStore {
  types: string[];
  newType: string;
  deleteType: string;
  test: {
    one: string;
    two: string;
  };
}

export const moodState = Store<MoodStore>(States.Moods, {
  types: ['happy', 'calm', 'cautious', 'alarmed'],
  newType: '',
  deleteType: '',
  test: {
    one: 'one',
    two: 'two',
  },
});
