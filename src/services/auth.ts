import { batch, createEffect, onMount } from 'solid-js';
import { createStore } from 'solid-js/store';

import { TCredentials } from '../schema/typings';

import { fetchToken, fetchQuery } from '../lib/db';

const initialState = () => ({
  token: '',
  userId: '',
});

const authService = ({ conn }: any) => {
  const [state, setState] = createStore(initialState());

  const storeToken = ({ token }: { token: string }) => {
    setState('token', token);
    console.log('Writing token to localStorage:', token);
    localStorage.accessToken = token;
  };

  onMount(() => {
    const token = localStorage.accessToken;
    if (token) {
      console.log('Reading token from localStorage:', token);
      setState('token', token);
    }
  });

  const authenticate = async () => {
    const { data } = await fetchQuery(
      conn,
      'SELECT id FROM user;',
      state.token
    );
    setState('userId', data.id);
  };

  const authenticated = () => {
    return !!state.userId;
  };

  createEffect(() => {
    if (state.token) {
      authenticate();
    }
  });

  return {
    state,
    authenticated,
    async signup(credentials: TCredentials) {
      const { data } = await fetchToken(conn, {
        ...credentials,
        method: 'signup',
      });
      storeToken(data);
    },
    async signin(credentials: TCredentials) {
      const { data } = await fetchToken(conn, {
        ...credentials,
        method: 'signin',
      });
      storeToken(data);
    },
    async signout() {
      delete localStorage.accessToken;
      delete localStorage.activePanel;
      setState(initialState());
    },
    query: (query: string) => {
      return fetchQuery(conn, query, state.token);
    },
  };
};

export default authService;
