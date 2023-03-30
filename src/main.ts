/* @refresh reload */
import { customElement } from 'solid-element';
import '@shoelace-style/shoelace/dist/shoelace';
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
    datapoint: 'http://localhost:8055/',
    title: 'Membership portal',
    namespace: 'test',
    database: 'test',
    scope: 'test',
  },
  Membership
);
