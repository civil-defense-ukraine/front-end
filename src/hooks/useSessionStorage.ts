import { Dispatch, SetStateAction, useState } from 'react';
type StoredData<T> = T;

export function useSessionStorage<T>(
  key: string,
  startValue: T,
): [StoredData<T>, Dispatch<SetStateAction<T>>] {
  const [storedValue, setValue] = useState<StoredData<T>>(() => {
    const data = sessionStorage.getItem(key);

    if (data === null) {
      return startValue;
    }

    try {
      return JSON.parse(data);
    } catch (e) {
      return startValue;
    }
  });

  const save = (value: T | ((prevState: T) => T)) => {
    const updatedNewValue =
      value instanceof Function ? value(storedValue) : value;

    sessionStorage.setItem(key, JSON.stringify(updatedNewValue));
    setValue(updatedNewValue);
  };

  return [storedValue, save];
}
