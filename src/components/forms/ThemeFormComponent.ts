import { FlyButton } from 'src/elements/Buttons';
import {
  Field,
  Fieldset,
  Form,
  Label,
  Legend,
  TextInput,
} from 'src/elements/Forms';
import { Store } from 'src/lib/store';
import { slugify } from 'src/lib/string';

interface ThemeFormComponentProps {
  name: string;
  prefix: string;
  onNameChange: (name: string) => void;
  onPrefixChange: (prefix: string) => void;
  onSubmit: () => void;
}

export const state = Store<{
  fsm: 'clean' | 'dirty' | 'error';
}>('ThemeFormComponent', {
  fsm: 'clean',
});

export const ThemeFormComponent = ({
  name,
  prefix,
  onNameChange,
  onPrefixChange,
  onSubmit,
}: ThemeFormComponentProps) => {
  return Form(
    Fieldset(
      Legend('Theme'),
      Field(
        Label('Name'),
        TextInput({
          value: name,
          onInput: (e: InputEvent) => {
            state.set({ fsm: 'dirty' });
            onNameChange((<HTMLInputElement>e.target).value);
          },
        })
      ),
      Field(
        Label('Prefix'),
        TextInput({
          value: prefix,
          onInput: (e: InputEvent) => {
            state.set({ fsm: 'dirty' });
            const target = <HTMLInputElement>e.target;
            const val = slugify(target.value);
            target.value = val;
            onPrefixChange(val);
          },
        })
      )
    ),
    Fieldset(
      FlyButton({
        text: 'Define Types',
        onClick: onSubmit,
      })
    )
  );
};
