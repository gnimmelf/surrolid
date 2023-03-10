/* @refresh reload */
import { customElement } from 'solid-element';

import Membership from './membership/App';

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
  'membership-widget',
  {
    apibaseurl: 'http://localhost:8055/',
    // apibaseurl="https://data.intergate.io/"
    title: 'Membership portal',
    namespace: 'test',
    database: 'test',
    scope: 'test',
  },
  Membership
);
