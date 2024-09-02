export type StateGetter<T> = () => T;
export type StateSetter<in out T> = {
  <U extends T>(...args: undefined extends T ? [] : [value: (prev: T) => U]): undefined extends T
    ? undefined
    : U;
  <U extends T>(value: (prev: T) => U): U;
  <U extends T>(value: Exclude<U, Function>): U;
  <U extends T>(value: Exclude<U, Function> | ((prev: T) => U)): U;
};
export type StateCreator<T> = (initalState: T) => [get: StateGetter<T>, set: StateSetter<T>];