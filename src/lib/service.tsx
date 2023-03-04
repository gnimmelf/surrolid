import {
  Component,
  createContext,
  JSXElement,
  useContext,
  batch,
  onMount,
} from 'solid-js';
import { createStore } from 'solid-js/store';
import { TCredentials, TProfile, TService } from '../schema/typings';

import { fetchToken, fetchQuery } from './db';

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
  apibaseurl: string;
  children: JSXElement;
}> = (props) => {
  const [state, setState] = createStore({
    authenticated: false,
    conn: {
      token: '',
      namespace: props.namespace,
      database: props.database,
      scope: props.scope,
      apibaseurl: props.apibaseurl,
    },
    profile: { ...initialState.profile },
    account: { ...initialState.account },
  });

  const actions = {
    async setAuthenticated(value: boolean) {
      if (value === false) {
        delete localStorage.accessToken;
        delete localStorage.activePanel;
        batch(() => {
          setState('conn', 'token', '');
          setState('profile', { ...initialState.profile });
          setState('account', { ...initialState.account });
          setState('authenticated', false);
        });
      } else {
        setState('authenticated', true);
        console.log('setting accessToken');
      }
    },
    async signup(credentials: TCredentials) {
      const result = await fetchToken({
        ...credentials,
        ...state.conn,
        method: 'signup',
      });
      setState('conn', 'token', result.token);
      localStorage.accessToken = result.token;
    },
    async signin(credentials: TCredentials) {
      const result = await fetchToken({
        ...credentials,
        ...state.conn,
        method: 'signin',
      });
      setState('conn', 'token', result.token);
      localStorage.accessToken = result.token;
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

      console.log('loadUser', { result, account, profile });

      batch(() => {
        setState('account', account);
        setState('profile', profile);
        setState('authenticated', true);
      });
    },
    async saveProfile(profile: TProfile) {
      const query = `UPDATE ${state.account.id} MERGE ${JSON.stringify(
        profile
      )} RETURN NONE`;
      await fetchQuery(state.conn, query);
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
        await fetchQuery(state.conn, query);
      }
    },
  };

  onMount(() => {
    const token = localStorage.accessToken;
    if (token) {
      console.log('Setting token from localStorage');
      setState('conn', 'token', token);
    }
  });

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
