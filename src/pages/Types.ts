import { BoxRow, Space } from 'src/elements/Boxes';
import { FlyButton } from 'src/elements/Buttons';
import {
  Field,
  Fieldset,
  Form,
  Label,
  Legend,
  TextInput,
} from 'src/elements/Forms';
import { H1, H2, P, Title } from 'src/elements/Typography';
import { Dom } from 'src/lib/dom';
import { h } from 'src/lib/h';
import { slugify } from 'src/lib/string';
import { atomsRoute, changeRoute } from 'src/routes';
import { typesPageState } from 'src/states';

export default class Types {
  container: Dom;
  constructor(container: Dom) {
    this.container = container;
    this.render = this.render.bind(this);
    this.addType = this.addType.bind(this);
    this.removeType = this.removeType.bind(this);
    this.onSave = this.onSave.bind(this);
  }
  addType() {
    const update = [
      ...typesPageState.get('types'),
      typesPageState.get('newType'),
    ];
    console.log(update);
    typesPageState.set({
      types: update,
      newType: '',
    });
    this.render();
  }
  removeType(type: string) {
    typesPageState.set({
      ...typesPageState.get(),
      types: typesPageState.get('types').filter((t: string) => t !== type),
    });
    this.render();
  }
  onSave() {
    changeRoute(atomsRoute());
  }
  render() {
    const el = h('div')(
      H1('Feno'),
      H2('Types'),
      P('Define the fundamental characteristics of your design system'),
      Form(
        Fieldset(
          Legend('Moods'),
          Field(
            ...typesPageState.get('types').map((t: string) =>
              BoxRow(
                FlyButton({
                  text: 'X',
                  onClick: () => this.removeType(t),
                }),
                Space(),
                Title(t)
              )
            )
          ),
          Field(
            BoxRow(
              TextInput({
                value: typesPageState.get('newType'),
                onInput: (e: InputEvent) => {
                  const target = <HTMLInputElement>e.target;
                  target.value = slugify(target.value);
                  typesPageState.set({
                    ...typesPageState.get(),
                    newType: target.value,
                  });
                },
              }),
              FlyButton({
                text: '+',
                onClick: this.addType,
              })
            )
          )
        ),
        Fieldset(
          FlyButton({
            text: 'Define Atoms',
            onClick: this.onSave,
          })
        )
      )
    );
    this.container.swap(el);
  }
}
