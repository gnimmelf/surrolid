import {
  children,
  Component,
  JSX,
  JSXElement,
  Show,
  splitProps
} from 'solid-js';

import { useI18n } from './I18nProvider';


const FormFeedback: Component<{
  isOpen: boolean
  message: string[]
  children: JSXElement
  [x: string]: unknown;
}> = (props) => {
  const { t } = useI18n();
  const [local, rest] = splitProps(props, ['isOpen', ]);

  return (
    <sl-alert attr:open={local.isOpen} {...rest}>
      {props.children}
      {props.message}
    </sl-alert>

  )
}

export const FormSuccess: Component<{
  [x: string]: unknown
}> = (props) => (
  //@ts-ignore
  <FormFeedback {...props} variant="success">
    <sl-icon slot="icon" attr:name="info-circle"></sl-icon>
  </FormFeedback>
)

export const FormError: Component<{
  [x: string]: unknown
}> = (props) => (
  //@ts-ignore
  <FormFeedback {...props} variant="warning">
    <sl-icon slot="icon" attr:name="exclamation-triangle"></sl-icon>
  </FormFeedback>
)

export const Input: Component<{
  errors?: string[];
  isSubmiting: boolean;
  [x: string]: unknown;
}> = (props) => {
  const { t } = useI18n();
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
