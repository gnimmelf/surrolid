import { Component } from 'solid-js';

import '@shoelace-style/shoelace/dist/components/spinner/spinner';

export const Loading: Component<{ children: string | undefined }> = (props) => (
  <sl-spinner style="font-size: 50px; --track-width: 10px;">
    {props.children || 'Loading'}
  </sl-spinner>
);
