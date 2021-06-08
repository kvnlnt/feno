export interface StoreProps<T> {
  name: string;
  get: (k?: keyof T) => any;
  set: (records: Partial<T>) => void;
}
type CreateMutable<Type> = {
  [Property in keyof Type]: Type[Property];
};

type Getters<Type> = {
  [Property in keyof Type as `get${Capitalize<
    string & Property
  >}`]: () => Type[Property];
};

export const Store = <T>(
  name: string,
  initialValues: T,
  storage: Storage = localStorage
): StoreProps<T> => {
  const get = (k: keyof CreateMutable<T> = null): any => {
    const store = storage.getItem(name)
      ? JSON.parse(storage.getItem(name))
      : {};
    if (!k) return store;
    return store[k];
  };

  const set = (newValues: Partial<T>) => {
    const update: T = { ...get(), ...newValues };
    const str = JSON.stringify(update);
    storage.setItem(name, str);
  };

  if (initialValues && !storage.getItem(name)) set(initialValues);
  return {
    name,
    get,
    set,
  };
};
