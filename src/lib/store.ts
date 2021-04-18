export interface StoreProps<T> {
  name: string;
  get: (k?: keyof T) => any;
  set: (records: T) => void;
}

export const Store = <T>(
  name: string,
  initialValues: T,
  storage: Storage = localStorage
): StoreProps<T> => {
  const get = (k: keyof T = null): any => {
    const store = storage.getItem(name)
      ? JSON.parse(storage.getItem(name))
      : {};
    if (!k) return store;
    return store[k];
  };

  const set = (newValues: Partial<T>) => {
    const str = JSON.stringify({ ...get(), ...newValues });
    storage.setItem(name, str);
  };
  if (initialValues && !storage.getItem(name)) set(initialValues);
  return {
    name,
    get,
    set,
  };
};
