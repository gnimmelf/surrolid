import { Component, createContext, JSXElement, useContext } from 'solid-js';
import { createStore } from 'solid-js/store';
import { fetchToken, fetchQuery, Auth } from '../lib/db';

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
    conn: {
      namespace: props.namespace,
      database: props.database,
      scope: props.scope,
      token: localStorage.getItem('accessToken'),
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
    async ping() {},
    async signup(credentials: Credentials) {
      const result = await fetchToken({
        ...credentials,
        ...state.conn,
        method: 'signup',
      });
      setState('conn', 'token', result.token);
    },
    async signin(credentials: Credentials) {
      const result = await fetchToken({
        ...credentials,
        ...state.conn,
        method: 'signin',
      });
      setState('conn', 'token', result.token);
    },
    async getProfile() {
      const result = await fetchQuery(state.conn, 'select email from user');
      setState('profile', result[0].result[0]);
    },
    signout() {
      console.log('Logout!');
      setState('conn', 'token', '');
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
  actions: { [x]: Function };
  state: { [x]: unknown };
};

export const useService = () => {
  return useContext(ServiceContext) as Service;
};
