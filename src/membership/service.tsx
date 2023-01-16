import { Component, createContext, JSXElement, useContext } from 'solid-js';
import { createStore } from 'solid-js/store';
import createAgent from './createAgent';

const ServiceContext = createContext();

export const ServiceProvider: Component<{ children: JSXElement }> = (props) => {
  const [store, setStore] = createStore({
    token: localStorage.getItem('accessToken'),
  });

  const actions = {
    ping() {},
    signup() {},
    signin() {},
  };
  const service = { store, actions };

  return (
    <ServiceContext.Provider value={service}>
      {props.children}
    </ServiceContext.Provider>
  );
};

type Service = {
  actions: { [key]: Function };
  store: { [key]: unknown };
};

export const useService = () => {
  return useContext(ServiceContext) as Service;
};
