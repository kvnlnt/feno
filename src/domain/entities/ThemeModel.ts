import { BaseModel } from './BaseModel';

interface ThemeModelProps {
  id: string;
  _name: string;
  _prefix: string;
}

interface ThemeModelArgs {
  id: string;
  name: string;
  prefix: string;
}

export class ThemeModel extends BaseModel implements ThemeModelProps {
  id: string;
  _name: string;
  _prefix: string;
  constructor({ id, name, prefix }: ThemeModelArgs) {
    super();
    this.id = id;
    this._name = name;
    this._prefix = prefix;
    this.save();
  }
  get name() {
    return this._name;
  }
  set name(name) {
    this._name = name;
    this.save();
  }
  get prefix() {
    return this._prefix;
  }
  set prefix(prefix) {
    this._prefix = prefix;
    this.save();
  }
  save() {
    localStorage.setItem(
      this.id,
      JSON.stringify({
        name: this._name,
        prefix: this._prefix,
      }),
    );
  }
}
