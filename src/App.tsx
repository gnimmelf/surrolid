import {
  Component,
  Suspense,
  createSignal,
  createResource,
  Show,
  For,
} from 'solid-js';
import { signin, signup } from './lib/db';

const defaultCredentials = {
  email: 'flemming@intergate.io',
  pass: 'flemming',
};

const ACTIONS = Object.freeze({
  SIGNUP: 'SIGNUP',
  SIGNIN: 'SIGNIN',
});

const Loading = ({ children }) => <span>{children || 'Loading'}</span>;

const App: Component = () => {
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

  return (
    <>
      <p>
        <label for="email">Email</label>
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
      </p>

      <p>
        <label for="pass">Pass</label>
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
      </p>

      <For each={Object.entries(ACTIONS)}>
        {([key, value], i) => (
          <button onClick={() => doAction(key)}>{value}</button>
        )}
      </For>

      <Suspense fallback={<Loading>{credentials.action}</Loading>}>
        <Show when={action === ACTIONS.SIGNIN}>
          <pre>{JSON.stringify(signinReq(), null, 2)}</pre>
        </Show>

        <Show when={action === ACTIONS.SIGNUP}>
          <pre>{JSON.stringify(signupReq(), null, 2)}</pre>
        </Show>
      </Suspense>
      <div>{action}</div>
    </>
  );
};

export default App;
