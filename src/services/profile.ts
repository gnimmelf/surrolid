import { createStore } from 'solid-js/store';

import { TService } from './ServiceProvider';

export type TProfile = {
  firstName: string;
  lastName: string;
  phone: string;
  address?: string;
};

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
      const { data } = (await auth.query(
        'SELECT owner, firstName, lastName, address, phone FROM profile;'
      )) as any;
      setState(data);
    },
    async updateDetails(data: TProfile) {
      await auth.query(
        `UPDATE profile MERGE ${JSON.stringify(data)} RETURN NONE`
      );
      setState(data);
    },
  };
};

export default profileService;
