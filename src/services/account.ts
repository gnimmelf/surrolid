import { createEffect } from 'solid-js';
import { createStore } from 'solid-js/store';

import { TProfile } from '../schema/typings';
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
      const { data } = await auth.query('SELECT email FROM user;');
      setState('email', data.email);
    },
    async updateDetails(data: TProfile) {
      await auth.query(
        `UPDATE ${auth.state.userId} MERGE ${JSON.stringify(data)} RETURN NONE`
      );
    },
  };
};

export default accountService;
