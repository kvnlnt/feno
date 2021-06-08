import { h } from 'src/lib/hyperscript';
import { H1, H2, P } from 'src/elements/Typography';
import { ShellMain } from 'src/elements/Shells';
import { MainMenu } from 'src/elements/Menus';
import { ThemeFormComponent } from 'src/components/forms/ThemeFormComponent';
import { appState, themeState } from 'src/stores';
import { typesRoute } from 'src/routes';

export const StartPage = () => {
  return ShellMain({
    menu: MainMenu(),
    content: h('div')(
      H1('Feno', ['id', 'test']),
      H2('Live in style'),
      P(
        "If you want your app age with style it's going to need a good pair of genes"
      ),
      ThemeFormComponent({
        name: themeState.get('name'),
        prefix: themeState.get('prefix'),
        onNameChange: (name: string) => {
          themeState.set({ name });
        },
        onPrefixChange: (prefix: string) => themeState.set({ prefix }),
        onSubmit: () => {
          appState.set({
            theme: {
              name: themeState.get('name'),
              prefix: themeState.get('prefix'),
            },
          });
          window.location.hash = typesRoute();
        },
      })
    ),
  });
};
