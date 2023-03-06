import {
  Component,
  createContext,
  JSXElement,
  useContext,
  batch,
  onMount,
} from 'solid-js';
import { createStore } from 'solid-js/store';

import agentService from '../services/agent';
import authService from '../services/auth';
import accountService from './account';

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
    token: '',
    profile: { ...initialState.profile },
    account: { ...initialState.account },
  });

  const store = {
    state,
    setState,
    initialState,
  };

  const agent = agentService({
    store,
    conn: {
      namespace: props.namespace,
      database: props.database,
      scope: props.scope,
      apibaseurl: props.apibaseurl,
    },
  });

  const auth = authService({ agent, store });
  const account = accountService({ agent, store });

  onMount(() => {
    const token = localStorage.accessToken;
    if (token) {
      console.log('Setting token from localStorage:', token);
      setState('token', token);
    }
  });

  const service = { state, auth, account };

  return (
    <ServiceContext.Provider value={service}>
      {props.children}
    </ServiceContext.Provider>
  );
};

export const useService = () => {
  return useContext(ServiceContext);
};
