import { Component, JSXElement } from 'solid-js';

import '@shoelace-style/shoelace/dist/components/spinner/spinner';

export const Loading: Component<{
  children?: JSXElement;
}> = (props) => (
  <div>
    <sl-spinner style="font-size: 50px; --track-width: 10px;">
      {props.children}
    </sl-spinner>
  </div>
);
