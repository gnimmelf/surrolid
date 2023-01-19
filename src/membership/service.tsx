import {
  Component,
  createContext,
  JSXElement,
  useContext,
  batch,
  onCleanup,
  createEffect,
  on,
} from 'solid-js';
import { createStore } from 'solid-js/store';
import { fetchToken, fetchQuery } from '../lib/db';

type Credentials = {
  email: string;
  pass: string;
};

type Profile = {
  email: string;
  firstName: string;
  lastName: string;
  phone: string;
  address?: string;
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
      firstName: '',
      lastName: '',
      address: '',
      phone: '',
    },
    account: {
      id: '',
      email: '',
      acceptedTerms: false,
      pass: '',
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
    async loadUser() {
      const result = await fetchQuery(
        state.conn,
        [
          'select id, email, consented from user',
          'select firstName, lastName, address, phone from user',
        ].join(';')
      );

      const account = Object.entries(result.data[0][0]).reduce(
        (acc, { k, v }) => ({ ...acc, [k]: v === null ? '' : v }),
        {}
      );
      const profile = Object.entries(result.data[1][0]).reduce(
        (acc, { k, v }) => ({ ...acc, [k]: v === null ? '' : v }),
        {}
      );

      console.log({ account, profile });

      batch(() => {
        setState('account', account);
        setState('profile', profile);
      });
    },
    async saveProfile(id: string, profile: Profile) {
      const result = await fetchQuery(state.conn, 'UPDATE ${id}:user SET xxx');
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

  createEffect(
    on(
      () => state.authenticated,
      (authenticated) => {
        if (authenticated) actions.loadUser();
      }
    )
  );

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
