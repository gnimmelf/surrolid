import { Component } from 'solid-js';

export const Loading: Component<{ children: string | undefined }> = (props) => (
  <sl-spinner style="font-size: 50px; --track-width: 10px;">
    {props.children || 'Loading'}
  </sl-spinner>
);
