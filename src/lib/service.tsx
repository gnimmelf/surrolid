import {
  Component,
  createContext,
  JSXElement,
  useContext,
  batch,
  onCleanup,
  createEffect,
  on,
  createSignal,
  createResource,
} from 'solid-js';
import { createStore } from 'solid-js/store';
import { Account } from '../membership/Account';
import { fetchToken, fetchQuery } from './db';

export type TCredentials = {
  email: string;
  pass: string;
};

export type TProfile = {
  firstName: string;
  lastName: string;
  phone: string;
  address?: string;
};

type TService = {
  actions: Record<string, Function>;
  resourceCreators: Record<string, Function>;
  state: {
    langs: Array<{ code: string; name: string }>;
    authenticated: boolean;
    profile: TProfile;
    account: TCredentials;
  };
};

const initialState = {
  profile: {
    firstName: '',
    lastName: '',
    address: '',
    phone: '',
  },
  account: {
    id: '',
    email: '',
  },
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
      token: localStorage.accessToken || '',
      namespace: props.namespace,
      database: props.database,
      scope: props.scope,
    },
    profile: { ...initialState.profile },
    account: { ...initialState.account },
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
          'SELECT id, email FROM user',
          'SELECT firstName, lastName, address, phone FROM user',
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
      await fetchQuery(state.conn, query);
    },
    async signout() {
      delete localStorage.accessToken;
      delete localStorage.activePanel;
      batch(() => {
        setState('authenticated', false);
        setState('conn', 'token', '');
        setState('profile', { ...initialState.profile });
        setState('account', { ...initialState.account });
      });
    },
    async saveAccount(credentials: TCredentials) {
      const { pass, email } = credentials;
      const queryStart = `UPDATE ${state.account.id} SET`;
      let queryParts = [];

      if (email !== state.account.email) {
        queryParts.push(`email = '${email}'`);
      }

      if (pass) {
        queryParts.push(`pass = crypto::argon2::generate('${pass}')`);
      }

      if (queryParts.length) {
        const query = `${queryStart} ${queryParts.join(', ')} RETURN NONE`;
        console.log({ query });
        await fetchQuery(state.conn, query);
      }
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
