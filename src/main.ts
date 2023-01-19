/* @refresh reload */
import { customElement } from 'solid-element';

import '@shoelace-style/shoelace/dist/themes/dark.css';
import '@shoelace-style/shoelace/dist/themes/light.css';
import { setBasePath } from '@shoelace-style/shoelace/dist/utilities/base-path.js';

import Membership from './membership/App';

setBasePath('@shoelace-style/shoelace/dist');

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
    title: 'Membership portal',
    namespace: 'test',
    database: 'test',
    scope: 'test',
  },
  Membership
);
