import { fetchToken, fetchQuery, TAuth } from '../lib/db';

const agentService = ({ store, conn }: any) => {
  const { state } = store;
  return {
    async fetchToken(auth: TAuth) {
      return fetchToken(conn, auth);
    },
    fetchQuery: (query: string) => {
      return fetchQuery(state.token, conn, query);
    },
  };
};

export default agentService;
