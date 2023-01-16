import { Component } from 'solid-js';

export const Loading: Component<{ children: string | undefined }> = (props) => (
  <span>{props.children || 'Loading'}</span>
);
