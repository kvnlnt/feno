import { BoxRow, Space } from 'src/elements/Boxes';
import { FlyButton } from 'src/elements/Buttons';
import { Field, Fieldset, Form, Legend, TextInput } from 'src/elements/Forms';
import { MainMenu } from 'src/elements/Menus';
import { ShellMain } from 'src/elements/Shells';
import { H1, H2, Title } from 'src/elements/Typography';
import { Dom } from 'src/lib/dom';
import { h } from 'src/lib/hyperscript';
import { slugify } from 'src/lib/string';

interface MoodInputProps {
  value: string;
  onInput: (val: string) => void;
}

export const MoodInput = ({ value, onInput }: MoodInputProps) =>
  TextInput({
    value: value,
    onInput: (e: InputEvent) => {
      const target = <HTMLInputElement>e.target;
      target.value = slugify(target.value);
      onInput(target.value);
    },
  });

interface MoodListProps {
  moods: string[];
  onDelete: (mood: string) => void;
}

export const MoodList = ({ moods, onDelete }: MoodListProps) =>
  Field(
    ...moods.map((t: string) =>
      BoxRow(
        FlyButton({
          text: 'X',
          onClick: () => onDelete(t),
        }),
        Space(),
        Title(t),
      ),
    ),
  );

interface ShellProps {
  moodInput: Dom;
  moodList: Dom;
  onAdd: () => void;
}

export const Shell = ({ moodInput, moodList, onAdd }: ShellProps) =>
  ShellMain({
    menu: MainMenu(),
    content: h('div')(
      H1('Feno', ['id', 'test']),
      H2('Types'),
      BoxRow(
        Form(
          Fieldset(
            Legend('Moods'),
            Field(
              BoxRow(
                moodInput.el,
                FlyButton({
                  text: '+',
                  onClick: onAdd,
                }),
              ),
            ),
            moodList.el,
          ),
        ),
      ),
      FlyButton({
        text: 'Define Atoms',
        onClick: () => {},
      }),
    ),
  });
