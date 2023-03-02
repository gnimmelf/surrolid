import { Component, JSX, Show } from 'solid-js';

export const Field: Component<{ children: JSX.Element; errors?: string[] }> = (
  props
) => {
  return (
    <div class="field">
      {props.children}
      <Show when={props.errors}>
        <div class="error">
          <sl-icon class="icon" attr:name="exclamation-circle" />
          <span>{props.errors?.join('. ')}</span>
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
