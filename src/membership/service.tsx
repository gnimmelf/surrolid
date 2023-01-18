import {
  Component,
  createContext,
  JSXElement,
  useContext,
  batch,
} from 'solid-js';
import { createStore } from 'solid-js/store';
import { fetchToken, fetchQuery } from '../lib/db';

type Credentials = {
  email: string;
  pass: string;
};

const ServiceContext = createContext();

export const ServiceProvider: Component<{
  namespace: string;
  database: string;
  scope: string;
  children: JSXElement;
}> = (props) => {
  const [state, setState] = createStore({
    authenticated: false,
    conn: {
      namespace: props.namespace,
      database: props.database,
      scope: props.scope,
      token: '',
    },
    profile: {
      email: '',
      firstName: '',
      lastName: '',
      address: '',
      phone: '',
    },
  });

  const actions = {
    async signup(credentials: Credentials) {
      const result = await fetchToken({
        ...credentials,
        ...state.conn,
        method: 'signup',
      });
      batch(() => {
        setState('authenticated', true);
        setState('conn', 'token', result.token);
      });
    },
    async signin(credentials: Credentials) {
      const result = await fetchToken({
        ...credentials,
        ...state.conn,
        method: 'signin',
      });
      batch(() => {
        setState('authenticated', true);
        setState('conn', 'token', result.token);
      });
    },
    async getProfile() {
      const result = await fetchQuery(state.conn, 'select email from user');
      setState('profile', result[0].result[0]);
    },
    async signout() {
      batch(() => {
        setState('authenticated', false);
        setState('conn', 'token', '');
      });
    },
    async ping() {
      const result = await poll();
    },
  };
  const service = { state, actions };

  return (
    <ServiceContext.Provider value={service}>
      {props.children}
    </ServiceContext.Provider>
  );
};

type Service = {
  actions: Record<string, Function>;
  state: Record<string, unknown>;
};

export const useService = () => {
  return useContext(ServiceContext) as Service;
};
