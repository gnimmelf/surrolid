import {
  Component,
  createContext,
  createEffect,
  JSXElement,
  useContext,
} from 'solid-js';

import authService from './auth';
import accountService from './account';
import profileService from './profile';

export type TService = {
  auth: ReturnType<typeof authService>;
  account: ReturnType<typeof accountService>;
  profile: ReturnType<typeof profileService>;
};

const ServiceContext = createContext<TService>();

export const ServiceProvider: Component<{
  namespace: string;
  database: string;
  scope: string;
  apibaseurl: string;
  children: JSXElement;
}> = (props) => {
  const auth = authService({
    conn: {
      namespace: props.namespace,
      database: props.database,
      scope: props.scope,
      apibaseurl: props.apibaseurl,
    },
  });
  const account = accountService({ auth } as TService);
  const profile = profileService({ auth } as TService);

  const service = { auth, account, profile };

  createEffect(() => {
    if (!auth.authenticated()) {
      account.resetState();
      profile.resetState();
    }
  });

  return (
    <ServiceContext.Provider value={service}>
      {props.children}
    </ServiceContext.Provider>
  );
};

export const useService = () => {
  return useContext(ServiceContext) as TService;
};
