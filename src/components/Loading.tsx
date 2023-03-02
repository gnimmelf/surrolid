import { Component, JSXElement } from 'solid-js';

import '@shoelace-style/shoelace/dist/components/spinner/spinner';

export const Loading: Component<{
  children?: JSXElement;
}> = (props) => (
  <div class="loading">
    <sl-spinner style="font-size: 50px; --track-width: 10px;"></sl-spinner>
    <div>{props.children}</div>
  </div>
);
