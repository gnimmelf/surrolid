import { Component, JSX, Show, splitProps } from 'solid-js';

import '@shoelace-style/shoelace/dist/components/button/button';
import '@shoelace-style/shoelace/dist/components/input/input';

export const Input: Component<{
  errors?: string[];
  isSubmiting: boolean;
  [x: string]: unknown;
}> = (props) => {
  const [local, rest] = splitProps(props, ['isSubmiting', 'errors']);
  return (
    <div class="field">
      <sl-input {...rest} disabled={local.isSubmiting}></sl-input>
      <Show when={local.errors}>
        <div class="error">
          <sl-icon class="icon" attr:name="exclamation-circle" />
          <span>{local.errors?.join('. ')}.</span>
        </div>
      </Show>
    </div>
  );
};

export const FetchButton: Component<{
  isSubmiting: boolean;
  children: JSX.Element;
  [x: string]: unknown;
}> = (props) => {
  const [local, rest] = splitProps(props, ['isSubmiting', 'children']);
  return (
    <sl-button {...rest} disabled={local.isSubmiting}>
      <Show when={local.isSubmiting}>
        <sl-icon class="rotate" slot="suffix" name="arrow-repeat"></sl-icon>
      </Show>
      {local.children}
    </sl-button>
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
