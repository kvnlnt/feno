import { BaseEntity } from './BaseEntity';

interface MoodEntityOpts {
  types: string[];
  newType: string;
  deleteType: string;
}

export class MoodEntity implements BaseEntity {
  types: string[];
  newType: string;
  deleteType: string;
  constructor({ types, newType, deleteType }: MoodEntityOpts) {
    this.types = types;
    this.newType = newType;
    this.deleteType = deleteType;
  }
  serializeJson() {
    return JSON.stringify({
      types: this.types,
      newType: this.newType,
      deleteType: this.deleteType,
    });
  }
}
