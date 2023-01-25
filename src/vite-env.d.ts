/// <reference types="vite/client" />

// Event.target extender, usage `(evt: DOMEvent<HTMLInputElement>) => {...}`
interface DOMEvent<T extends EventTarget> extends Event {
  readonly target: T;
}
