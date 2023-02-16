import { Component, JSX, Show } from 'solid-js';

export const Field: Component<{ children: JSX.Element; errors?: string[] }> = (
  props
) => {
  return (
    <div class="field">
      {props.children}
      <Show when={props.errors}>
        <div class="error">{props.errors?.join('.')}</div>
      </Show>
    </div>
  );
};
