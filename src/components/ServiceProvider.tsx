import {
  Component,
  createContext,
  JSXElement,
  Suspense,
  useContext,
  createResource
} from 'solid-js';

import DbService from '../services/DbService';
import AuthService from '../services/AuthService';
import AccountService from '../services/AccountService';
import ProfileService from '../services/ProfileService';
import { Loading } from './Loading';
import { noop } from '../lib/utils';

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
  const dbService = new DbService(props.datapoint, props.namespace, props.database)
  const authService = new AuthService(dbService, {
    namespace: props.namespace,
    database: props.database,
    scope: props.scope,
  })
  const accountService = new AccountService(dbService);
  const profileService = new ProfileService(dbService);

  const services = {
    auth: authService,
    account: accountService,
    profile: profileService
  };

  const [connectDb] = createResource(
    () => !(dbService.isConnected),
    async () => {
      if (!dbService.isConnected) {
        await dbService.connect()
        await authService.authenticate()
      }
    }
  );

  return (
    <Suspense fallback={<Loading />}>
      {noop(connectDb)}
      <ServiceContext.Provider value={services}>
        {props.children}
      </ServiceContext.Provider>
    </Suspense>
  );
};

export const useService = () => {
  return useContext(ServiceContext) as ServiceProvider;
};
