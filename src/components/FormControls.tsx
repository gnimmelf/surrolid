import { Component, createEffect, JSX, Show, splitProps } from 'solid-js';
import { useI18n } from '@solid-primitives/i18n';

export const Input: Component<{
  errors?: string[];
  isSubmiting: boolean;
  [x: string]: unknown;
}> = (props) => {
  const [t] = useI18n();
  const [local, rest] = splitProps(props, ['isSubmiting', 'errors']);

  return (
    <div class="field">
      <sl-input {...rest} disabled={local.isSubmiting}></sl-input>
      <Show when={local.errors}>
        <div class="error">
          <sl-icon class="icon" name="exclamation-circle" />
          <span>{local.errors?.map((str) => t(str) || str).join('. ')}.</span>
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
  const handleSubmit = (evt: Event) => {
    evt.preventDefault();
    props.onSubmit();
  };
  return <form onSubmit={handleSubmit}>{props.children}</form>;
};
