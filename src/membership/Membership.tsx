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

const Loading = ({ children }) => <span>{children || 'Loading'}</span>;

interface IProps {
  title: string;
}

const Membership: Component<IProps> = ({ title }) => {
  const [credentials, setCredentials] = createSignal(defaultCredentials);

  const [action, setAction] = createSignal();
  const [signinSrc, setSigninSrc] = createSignal();
  const [signupSrc, setSignupSrc] = createSignal();

  const [signinReq] = createResource(signinSrc, signin);
  const [signupReq] = createResource(signupSrc, signup);

  const doAction = (action) => {
    setAction(action);
    switch (action) {
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

  console.info({ action, signinReq, signupReq });

  return (
    <section class="membership-widget">
      <style>{styles}</style>
      <div>
        <h1>{title}</h1>
        <div class="input email">
          <div class="">
            <label for="email">Email</label>
          </div>
          <div class="">
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
        </div>

        <div class="">
          <div class="">
            <label for="pass">Pass</label>
          </div>
          <div class="">
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

        <div class="">
          <For each={Object.values(ACTIONS)}>
            {(value, i) => (
              <ButtonPrimary onClick={() => doAction(value)}>
                {value}
              </ButtonPrimary>
            )}
          </For>
        </div>

        <Suspense fallback={<Loading>{credentials.action}</Loading>}>
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
