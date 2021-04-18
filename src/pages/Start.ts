import { Dom } from 'src/lib/dom';
import { h } from 'src/lib/h';
import { H1, H2, P } from 'src/elements/Typography';
import {
  Form,
  Fieldset,
  TextInput,
  Label,
  Legend,
  Field,
} from 'src/elements/Forms';
import { FlyButton } from 'src/elements/Buttons';
import { slugify } from 'src/lib/string';
import { changeRoute, typesRoute } from 'src/routes';
import { globalState, startPageState } from 'src/states';

type PageState = 'start';

export default class Start {
  container: Dom;
  constructor(container: Dom, pageState: PageState = 'start') {
    this.container = container;
    this.render = this.render.bind(this);
    this.onThemeNameChange = this.onThemeNameChange.bind(this);
    this.onThemePrefixChange = this.onThemePrefixChange.bind(this);
    this.onSave = this.onSave.bind(this);
  }
  onThemeNameChange(e: InputEvent) {
    const target = <HTMLInputElement>e.target;
    const val = target.value;
    startPageState.set({ ...startPageState.get(), themeName: val });
    target.value = val;
  }
  onThemePrefixChange(e: InputEvent) {
    const target = <HTMLInputElement>e.target;
    const val = slugify(target.value);
    startPageState.set({ ...startPageState.get(), themePrefix: val });
    target.value = val;
  }
  onSave() {
    globalState.set({
      themeName: startPageState.get('themeName'),
      themePrefix: startPageState.get('themePrefix'),
    });
    changeRoute(typesRoute());
  }
  render() {
    const el = h('div')(
      H1('Feno'),
      H2('Live in style'),
      P(
        "If you want your app age with style it's going to need a good pair of genes"
      ),
      Form(
        Fieldset(
          Legend('Theme'),
          Field(
            Label('Name'),
            TextInput({
              value: startPageState.get('themeName'),
              onInput: this.onThemeNameChange,
            })
          ),
          Field(
            Label('Prefix'),
            TextInput({
              value: startPageState.get('themePrefix'),
              onInput: this.onThemePrefixChange,
            })
          )
        ),
        Fieldset(
          FlyButton({
            text: 'Define Types',
            onClick: this.onSave,
          })
        )
      )
    );
    this.container.swap(el);
  }
}
