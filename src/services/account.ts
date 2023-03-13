import { createStore } from 'solid-js/store';
import { TCredentials } from './auth';

import { TService } from './ServiceProvider';

const initialState = () => ({
  email: '',
});

const accountService = ({ auth }: TService) => {
  const [state, setState] = createStore(initialState());

  return {
    state,
    async resetState() {
      setState(initialState());
    },
    async loadDetails() {
      const { data } = (await auth.query('SELECT email FROM account;')) as any;
      setState('email', data.email);
    },
    async updateDetails(data: TCredentials) {
      await auth.query(
        `UPDATE ${auth.state.userId} MERGE ${JSON.stringify(data)} RETURN NONE`
      );
      setState(data);
    },
  };
};

export default accountService;
