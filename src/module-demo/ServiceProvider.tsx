import {
  Component,
  createContext,
  JSXElement,
  Suspense,
  useContext,
  createResource,
} from 'solid-js';

import DbService from '../services/DbService';
import AuthService from '../services/AuthService';
import { Loading } from '../components/Loading';
import { noop } from '../lib/utils';
import { createSignal } from 'solid-js';

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
  console.log({ props })
  // Requires Surreal to be started with --allow-guests
  const dbService = new DbService({
    datapoint: props.datapoint,
    namespace: props.namespace,
    database: props.database
  }, createSignal)

  const authService = new AuthService(dbService, {
    namespace: props.namespace,
    database: props.database,
    scope: ''
  }, createSignal)

  const services = {
    db: dbService,
    auth: authService
  };

  const [connectDb] = createResource(
    () => !(dbService.state().isConnected),
    async () => {
      await dbService.connect()
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
