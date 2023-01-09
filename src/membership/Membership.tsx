import {
  Component,
  Suspense,
  createSignal,
  createResource,
  Show,
  For,
} from 'solid-js';
import { signin, signup } from '../lib/db';

import { ButtonPrimary } from '../atoms/ButtonPrimary';

import styles from './membership.css?inline';

const defaultCredentials = {
  email: 'flemming@intergate.io',
  pass: 'flemming',
};

const ACTIONS = Object.freeze({
  SIGNUP: 'SIGNUP',
  SIGNIN: 'SIGNIN',
});

const Loading: Component<{ children: string | undefined }> = (props) => (
  <span>{props.children || 'Loading'}</span>
);

const Membership: Component<{ title: string }> = (props) => {
  const [credentials, setCredentials] = createSignal(defaultCredentials);

  const [action, setAction] = createSignal<string>();
  const [signinSrc, setSigninSrc] = createSignal();
  const [signupSrc, setSignupSrc] = createSignal();

  const [signinReq] = createResource(signinSrc, signin);
  const [signupReq] = createResource(signupSrc, signup);

  const doAction = (value: string) => {
    setAction(value);
    switch (value) {
      case ACTIONS.SIGNIN:
        setSigninSrc({
          ...credentials(),
        });
        break;
      case ACTIONS.SIGNUP:
        setSignupSrc({
          ...credentials(),
        });
        break;
    }
  };

  console.info(action());

  return (
    <section class="flex-col mx-auto">
      <style>{styles}</style>
      <div>
        <h1 class="text-2xl">{props.title}</h1>

        <div class="grid grid-cols-2 place-content-center mb-4">
          <div class="max-w-sm">
            <label for="email">Email</label>
          </div>
          <div class="max-w-sm">
            <input
              name="email"
              type="text"
              value={credentials().email}
              onInput={(e) =>
                setCredentials((prev) => ({
                  ...prev,
                  email: e.currentTarget.value,
                }))
              }
            />
          </div>

          <div class="max-w-sm">
            <label for="pass">Pass</label>
          </div>

          <div class="max-w-sm">
            <input
              name="pass"
              type="text"
              value={credentials().pass}
              onInput={(e) =>
                setCredentials((prev) => ({
                  ...prev,
                  pass: e.currentTarget.value,
                }))
              }
            />
          </div>
        </div>

        <div class="flex space-x-4">
          <For each={Object.values(ACTIONS)}>
            {(value) => (
              <ButtonPrimary onClick={() => doAction(value)}>
                {value}
              </ButtonPrimary>
            )}
          </For>
        </div>

        <Suspense fallback={<Loading>{action()}</Loading>}>
          <Show when={action() === ACTIONS.SIGNIN}>
            <pre>{JSON.stringify(signinReq(), null, 2)}</pre>
          </Show>

          <Show when={action() === ACTIONS.SIGNUP}>
            <pre>{JSON.stringify(signupReq(), null, 2)}</pre>
          </Show>
        </Suspense>
      </div>
    </section>
  );
};

export { Membership };
