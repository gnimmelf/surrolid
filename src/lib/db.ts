const defaultParams = {
  ns: 'intergate',
  db: 'test',
  sc: 'account',
};

const doFetch = async (urlPath, { headers = {}, body = {} } = {}) => {
  const response = await fetch(`http://localhost:8000/${urlPath}`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      ...headers,
    },
    body: JSON.stringify({
      ...body,
      ...defaultParams,
    }),
  });
  const result = response.json();
  console.info(urlPath, { result });
  return result;
};

export const signin = async (credentials) => {
  return await doFetch('signin', { body: credentials });
};

export const signup = async (credentials) => {
  return await doFetch('signup', { body: credentials });
};

export const userCount = async () => {
  return await doFetch('sql', { body: credentials });
};
