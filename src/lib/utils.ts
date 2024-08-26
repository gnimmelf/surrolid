import { Accessor, createSignal, from } from 'solid-js';

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
  return result.pop().pop()
}


/**
 * Class extension to make instances observable
 */
export class Observable {
  #subscribers: Function[];

  constructor() {
    this.#subscribers = []
  }

  subscribe(subscriber: Function) {
    this.#subscribers.push(subscriber)
    return () => this.unsubscribe(subscriber)
  }

  unsubscribe(subscriber: Function): void {
    this.#subscribers = this.#subscribers.filter(fn => fn !== subscriber);
  }

  next(value: any): void {
    // Call each subscriber function with value
    this.#subscribers.forEach((subscriber) => subscriber(value))
  }
}