import { createStore } from 'solid-js/store';

import { TProfile } from '../schema/typings';
import { TService } from './ServiceProvider';

const initialState = () => ({
  firstName: '',
  lastName: '',
  address: '',
  phone: '',
});

const profileService = ({ auth }: TService) => {
  const [state, setState] = createStore(initialState());

  return {
    state,
    resetState() {
      setState(initialState());
    },
    async loadDetails() {
      const { data } = await auth.query(
        'SELECT firstName, lastName, address, phone FROM user;'
      );
      setState(data);
    },
    async updateDetails(data: TProfile) {
      await auth.query(
        `UPDATE ${auth.state.userId} MERGE ${JSON.stringify(data)} RETURN NONE`
      );
      setState(data);
    },
  };
};

export default profileService;
