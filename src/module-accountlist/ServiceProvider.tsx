import {
  Component,
  createContext,
  JSXElement,
  Suspense,
  useContext,
  createResource,
} from 'solid-js';
import { createStore } from "solid-js/store"

import DbService from '../services/DbService';
import AuthService from '../services/AuthService';
import AccountService from '../services/AccountService';
import ProfileService from '../services/ProfileService';
import { Loading } from '../components/Loading';
import { noop } from '../lib/utils';

type TServiceProvider = {
  db: DbService
}

const ServiceContext = createContext<TServiceProvider>();

export const ServiceProvider: Component<{
  namespace: string;
  database: string;
  datapoint: string;
  children: JSXElement;
}> = (props) => {
  const dbService = new DbService(props.datapoint, props.namespace, props.database)
  const authService = new AuthService(dbService, {
    namespace: props.namespace,
    database: props.database,
    scope: props.scope,
  })

  const services = {
    db: dbService,
    auth: authService
  };

  const [connectDb] = createResource(
    () => !(dbService.isConnected),
    async () => {
      await dbService.connect()
      await authService.signin({

      })
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
  return useContext(ServiceContext) as TServiceProvider;
};
