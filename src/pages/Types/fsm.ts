import { MoodEntity } from 'src/entities/MoodEntity';
import { dom, Dom } from 'src/lib/dom';
import { moodState } from 'src/stores';
import { MoodInput, MoodList, Shell } from './views';

type TypeFSMActions = 'EntryAction' | 'AddAction' | 'DeleteAction';
type TypeFSMViews = 'RefreshView';
type TypesFSM = TypeFSMActions | TypeFSMViews;

interface TypesProps {
  root: Dom;
  fsm?: TypesFSM;
  moodStore: MoodEntity;
}

export class Types {
  root: Dom;
  moodInput: Dom = dom();
  moodList: Dom = dom();
  moodStore: MoodEntity;
  constructor({ root, fsm = 'EntryAction', moodStore }: TypesProps) {
    this.root = root;
    this.moodStore = moodStore;
    this.onAdd = this.onAdd.bind(this);
    this.onDelete = this.onDelete.bind(this);
    this.machine(fsm);
  }
  machine(fsm: TypesFSM) {
    switch (fsm) {
      // Views
      case 'RefreshView':
        this.renderMoodInput();
        this.renderMoodList();
        break;
      // Actions
      case 'EntryAction':
        this.renderShell();
        this.machine('RefreshView');
        break;
      case 'AddAction':
        this.onAdd();
        this.machine('RefreshView');
        break;
      case 'DeleteAction':
        this.onDelete();
        this.machine('RefreshView');
        break;
    }
  }
  onAdd() {
    const update = [...moodState.get('types'), moodState.get('newType')];
    moodState.set({
      types: update,
      newType: '',
    });
  }
  onDelete() {
    moodState.set({
      types: moodState.get('types').filter((type: string) => moodState.get('deleteType') !== type),
    });
  }
  renderMoodInput() {
    this.moodInput.swap(
      MoodInput({
        value: moodState.get('newType'),
        onInput: (value: string) =>
          moodState.set({
            newType: value,
          }),
      }),
    );
  }
  renderMoodList() {
    this.moodList.swap(
      MoodList({
        moods: moodState.get('types'),
        onDelete: (value: string) => {
          moodState.set({ deleteType: value });
          this.machine('DeleteAction');
        },
      }),
    );
  }
  renderShell() {
    this.root.swap(
      Shell({ moodInput: this.moodInput, moodList: this.moodList, onAdd: () => this.machine('AddAction') }),
    );
  }
}
