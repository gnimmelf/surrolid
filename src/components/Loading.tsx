import { Component, JSXElement } from 'solid-js';

export const Loading: Component<{
  children?: JSXElement;
}> = (props) => (
  <div class="loading">
    <sl-spinner style="font-size: 50px; --track-width: 10px;"></sl-spinner>
    <div>{props.children}</div>
  </div>
);
