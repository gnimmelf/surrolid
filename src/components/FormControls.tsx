import { Component, JSX, Show, splitProps } from 'solid-js';

import '@shoelace-style/shoelace/dist/components/button/button';
import '@shoelace-style/shoelace/dist/components/input/input';

export const Input: Component<{
  errors?: string[];
  isLoading: boolean;
  [x: string]: unknown;
}> = (props) => {
  const [local, rest] = splitProps(props, ['isLoading', 'errors']);
  return (
    <div class="field">
      <sl-input {...rest} disabled={local.isLoading}></sl-input>
      <Show when={local.errors}>
        <div class="error">
          <sl-icon class="icon" attr:name="exclamation-circle" />
          <span>{local.errors?.join('. ')}</span>
        </div>
      </Show>
    </div>
  );
};

export const Form: Component<{ children: JSX.Element; onSubmit: Function }> = (
  props
) => {
  const handleSubmit = (evt) => {
    evt.preventDefault();
    props.onSubmit();
  };
  return <form onSubmit={handleSubmit}>{props.children}</form>;
};

export const FetchButton: Component<{
  isLoading: boolean;
  children: JSX.Element;
  [x: string]: unknown;
}> = (props) => {
  const [local, rest] = splitProps(props, ['isLoading', 'children']);
  return (
    <sl-button {...rest} disabled={local.isLoading}>
      <Show when={local.isLoading}>
        <sl-icon class="rotate" slot="suffix" name="arrow-repeat"></sl-icon>
      </Show>
      {local.children}
    </sl-button>
  );
};
