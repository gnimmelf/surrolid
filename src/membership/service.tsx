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

type TCredentials = {
  email: string;
  pass: string;
};

export type TProfile = {
  email: string;
  firstName: string;
  lastName: string;
  phone: string;
  address?: string;
};

type TService = {
  actions: Record<string, Function>;
  state: {
    langs: Array<{ code: string; name: string }>;
    authenticated: boolean;
    profile: TProfile;
  };
};

const ServiceContext = createContext();

export const ServiceProvider: Component<{
  namespace: string;
  database: string;
  scope: string;
  langs: Array<{ code: string; name: string }>;
  children: JSXElement;
}> = (props) => {
  const [state, setState] = createStore({
    langs: props.langs,
    authenticated: false,
    conn: {
      namespace: props.namespace,
      database: props.database,
      scope: props.scope,
      // Getting a value for `accessToken` will kick off authetication
      token: localStorage.getItem('accessToken') || '',
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
      pass: '',
    },
  });

  const authenticate = ({ token }) => {
    localStorage.setItem('accessToken', token);
    batch(() => {
      setState('authenticated', true);
      setState('conn', 'token', token);
    });
  };

  const actions = {
    async signup(credentials: TCredentials) {
      const result = await fetchToken({
        ...credentials,
        ...state.conn,
        method: 'signup',
      });
      authenticate(result);
    },
    async signin(credentials: TCredentials) {
      const result = await fetchToken({
        ...credentials,
        ...state.conn,
        method: 'signin',
      });
      authenticate(result);
    },
    async loadUser() {
      const result = await fetchQuery(
        state.conn,
        [
          'select id, email from user',
          'select firstName, lastName, address, phone from user',
        ].join(';')
      );

      const account = Object.entries(result.data[0][0]).reduce(
        (acc, [k, v]) => ({ ...acc, [k]: v === null ? '' : v }),
        {}
      );
      const profile = Object.entries(result.data[1][0]).reduce(
        (acc, [k, v]) => ({ ...acc, [k]: v === null ? '' : v }),
        {}
      );

      console.log({ result, account, profile });

      batch(() => {
        setState('account', account);
        setState('profile', profile);
      });
    },
    async saveProfile(profile: TProfile) {
      const query = `UPDATE ${state.account.id} MERGE ${JSON.stringify(
        profile
      )}`;
      console.log({ query });
      const result = await fetchQuery(state.conn, query);
    },
    async signout() {
      delete localStorage['accessToken'];
      batch(() => {
        setState('authenticated', false);
        setState('conn', 'token', '');
      });
    },
  };

  createEffect(
    // Try loading user data once on authenticated
    on(
      () => state.authenticated,
      (authenticated) => {
        if (authenticated)
          try {
            actions.loadUser();
          } catch (err) {
            actions.signout();
          }
      }
    )
  );

  createEffect(
    // Kick off authentication once when token is set
    on(
      () => state.conn.token,
      (token) => {
        console.log({ token });
        if (token) authenticate({ token });
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

export const useService = (): TService => {
  return useContext(ServiceContext) as TService;
};
