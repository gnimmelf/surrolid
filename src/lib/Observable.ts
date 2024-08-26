/**
 * Class extension to make instances observable
 */
export abstract class Observable {
    #subscribers: Function[];
    protected _state: any

    constructor(state: any) {
      this.#subscribers = []
      this._state = state
    }

    subscribe(subscriber: Function) {
      this.#subscribers.push(subscriber)
      return () => this.unsubscribe(subscriber)
    }

    unsubscribe(subscriber: Function): void {
      this.#subscribers = this.#subscribers.filter(fn => fn !== subscriber);
    }

    #next(value: any): void {
      // Call each subscriber function with value
      this.#subscribers.forEach((subscriber) => subscriber(value))
    }

    setState(state: any) {
      this._state = state
      this.#next(state)
    }

    get state() {
      return structuredClone(this._state)
    }
  }