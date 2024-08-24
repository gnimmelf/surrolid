import {
  Component,
  createContext,
  createEffect,
  JSXElement,
  useContext,
} from 'solid-js';

import DbService from '../services/DbService';
import AuthService from '../services/AuthService';
import AccountService from '../services/AccountService';
import ProfileService from '../services/ProfileService';
import { createStore } from 'solid-js/store';

type ServiceProvider = {
  auth: AuthService
  account: AccountService
  profile: ProfileService
}

const ServiceContext = createContext<ServiceProvider>();

export const ServiceProvider: Component<{
  namespace: string;
  database: string;
  scope: string;
  datapoint: string;
  children: JSXElement;
}> = (props) => {
  const dbService = new DbService(props.datapoint)
  const authService = new AuthService(dbService, {
    namespace: props.namespace,
    database: props.database,
    scope: props.scope,
  })
  const accountService = new AccountService(dbService);
  const profileService = new ProfileService(dbService);

  const service = {
    auth: authService,
    account: accountService,
    profile: profileService
  };

  createEffect(() => {
    // TODO! Connect to db, and login if `localstorage.accessToken`
    if (!authService.isAuthenticated) {
      // Clear `localstorage.accessToken`
    }
  });

  return (
    <ServiceContext.Provider value={service}>
      {props.children}
    </ServiceContext.Provider>
  );
};

export const useService = () => {
  return useContext(ServiceContext) as ServiceProvider;
};
