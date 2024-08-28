/* @refresh reload */
import { customElement } from 'solid-element';
import Portal from './module-portal/App';
import Accountlist from './module-accountlist/App'

declare module 'solid-js' {
  namespace JSX {
    type ElementProps<T> = {
      // Add both the element's prefixed properties and the attributes
      [K in keyof T]: Props<T[K]> & HTMLAttributes<T[K]>;
    };
    // Prefixes all properties with attr: to match Solid's property setting syntax
    type Props<T> = {
      [K in keyof T as `attr:${string & K}`]?: T[K];
    };
    interface IntrinsicElements extends ElementProps<HTMLElementTagNameMap> {}
  }
}

customElement(
  'portal-widget',
  {
    title: 'Membership portal',
    datapoint: 'wss://localhost:8055/',
    namespace: 'test',
    database: 'test',
    scope: 'test',
  },
  Portal
);

customElement(
  'accountlist-widget',
  {
    title: 'Membership portal',
    datapoint: 'wss://localhost:8055/',
    namespace: 'test',
    database: 'test',
    scope: 'test',
  },
  Accountlist
)
