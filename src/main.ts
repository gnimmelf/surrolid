/* @refresh reload */
import { customElement } from 'solid-element';

import './lib/shoelace-setup'

import Portal from './module-portal/App';
import DemoAccounts from './module-demo/App'


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
  'membership-portal',
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
  'demo-accounts',
  {
    title: 'Demo accounts portal',
    datapoint: 'wss://localhost:8055/',
    namespace: 'test',
    database: 'test',
    scope: 'test',
  },
  DemoAccounts
)
