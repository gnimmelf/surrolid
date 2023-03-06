import { batch } from 'solid-js';

import { TCredentials, TProfile } from '../schema/typings';

const accountService = ({ agent, store }: any) => {
  const { state, setState } = store;
  return {
    async load() {
      const result = await agent.fetchQuery(
        [
          'SELECT id, email FROM user',
          'SELECT firstName, lastName, address, phone FROM user',
        ].join(';')
      );

      const account = Object.entries(result.data[0][0]).reduce(
        (acc, [k, v]) => ({ ...acc, [k]: v === null ? '' : v }),
        {}
      );
      const profile = Object.entries(result.data[1][0]).reduce(
        (acc, [k, v]) => ({ ...acc, [k]: v === null ? '' : v }),
        {}
      );

      batch(() => {
        setState('account', account);
        setState('profile', profile);
        setState('authenticated', true);
      });
    },
    async saveProfile(profile: TProfile) {
      const query = `UPDATE ${state.account.id} MERGE ${JSON.stringify(
        profile
      )} RETURN NONE`;
      await agent.fetchQuery(query);
    },
    async saveAccount(credentials: TCredentials) {
      const { pass, email } = credentials;
      const queryStart = `UPDATE ${state.account.id} SET`;
      let queryParts = [];

      if (email !== state.account.email) {
        queryParts.push(`email = '${email}'`);
      }

      if (pass) {
        queryParts.push(`pass = crypto::argon2::generate('${pass}')`);
      }

      if (queryParts.length) {
        const query = `${queryStart} ${queryParts.join(', ')} RETURN NONE`;
        await agent.fetchQuery(query);
      }
    },
  };
};

export default accountService;
