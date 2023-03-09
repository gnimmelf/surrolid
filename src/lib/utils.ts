import { createSignal } from 'solid-js';

export const unWrapQueryData: any = (data: object[][]) => {
  let tmp: any = data;
  while (tmp.length === 1) tmp = tmp[0];
  return tmp;
};

export const noop = (...args: any[]) => undefined;

export const createVoidSignal = createSignal<void>(undefined, {
  equals: false,
});
