export default function useForm<T extends Record<string, any>>() {
  let state: T = {} as T;

  const setState = (newState: Partial<T>) => {
    state = {
      ...state,
      newState,
    };
  };

  const getState = (): T => state;

  return {
    setState,
    getState,
  };
}
