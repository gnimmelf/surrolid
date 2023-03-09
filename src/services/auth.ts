import { onMount } from 'solid-js';
import { createStore } from 'solid-js/store';

import { fetchToken, fetchQuery, TConnection } from '../lib/db';

export type TCredentials = {
  email: string;
  pass: string;
};

const initialState = () => ({
  token: '',
  userId: '',
});

const authService = ({ conn }: { conn: TConnection }) => {
  const [state, setState] = createStore(initialState());

  const setToken = ({ token }: { token: string }) => {
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

  const authenticated = () => {
    return !!state.userId;
  };

  return {
    state,
    authenticated,
    async signup(credentials: TCredentials) {
      const { data } = await fetchToken(conn, {
        ...credentials,
        method: 'signup',
      });
      setToken(data);
    },
    async signin(credentials: TCredentials) {
      const { data } = await fetchToken(conn, {
        ...credentials,
        method: 'signin',
      });
      setToken(data);
    },
    async loadDetails() {
      const { data } = (await fetchQuery(
        conn,
        'SELECT id FROM user;',
        state.token
      )) as any;
      setState('userId', data.id);
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
