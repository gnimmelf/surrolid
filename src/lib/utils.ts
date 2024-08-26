import { createSignal } from 'solid-js';

export const unWrapQueryData: any = (data: object[][]) => {
  let tmp: any = data;
  while (tmp.length === 1) tmp = tmp[0];
  return tmp;
};

/**
 * A no-operations wrapper used in JSX trick Solid to track whatever is passed into it.
 * @param func function to track
 * @returns undefined
 */
export const noop = (arg: any): any => undefined

export const createVoidSignal = createSignal<void>(undefined, {
  equals: false,
});

export const unpackResult = <T>(result: T[]): T => {
  // @ts-ignore
  return result.pop().pop()
}


export const awaitCondition = async (conditionCheck: Function, ms = 10) => {
  while (!conditionCheck()) {
    await new Promise((resolve) => setTimeout(resolve, ms));
  }
}