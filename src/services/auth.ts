import { batch } from 'solid-js';

import { TCredentials } from '../schema/typings';

const authService = ({ agent, store }: any) => {
  const { setState, initialState } = store;

  const storeToken = ({ token }: any) => {
    setState('token', token);
    localStorage.accessToken = token;
  };

  return {
    async signup(credentials: TCredentials) {
      const result = await agent.fetchToken({
        ...credentials,
        method: 'signup',
      });
      storeToken(result);
    },
    async signin(credentials: TCredentials) {
      const result = await agent.fetchToken({
        ...credentials,
        method: 'signin',
      });
      storeToken(result);
    },
    async signout() {
      delete localStorage.accessToken;
      delete localStorage.activePanel;
      batch(() => {
        setState('authenticated', false);
        setState('token', '');
        setState('profile', { ...initialState.profile });
        setState('account', { ...initialState.account });
      });
    },
  };
};

export default authService;
