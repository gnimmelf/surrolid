export type Connection = {
  namespace: string;
  database: string;
  scope: string;
  token: string | null | undefined;
};

export type Auth = {
  method: string;
  email: string;
  pass: string;
} & Connection;

const parseMeta = (
  response: Response
): {
  meta: Pick<
    Response,
    'headers' | 'ok' | 'redirected' | 'status' | 'statusText' | 'type' | 'url'
  >;
} => {
  const { headers, ok, redirected, status, statusText, type, url } = response;
  return {
    meta: {
      headers,
      ok,
      redirected,
      status,
      statusText,
      type,
      url,
    },
  };
};

const doFetch = async (urlPath: string, { headers = {}, body = {} } = {}) => {
  const response = await fetch(`http://localhost:8000/${urlPath}`, {
    method: 'POST',
    headers: {
      ...headers,
      Accept: 'application/json',
    },
    body: typeof body === 'string' ? body : JSON.stringify(body),
  });

  if (response.status >= 500) {
    throw new Error(
      `Could not fetch ${response.url}: ${response.status} - ${response.statusText}`
    );
  }
  return response;
};

export const fetchToken = async (auth: Auth) => {
  const response: Response = await doFetch(auth.method, {
    body: {
      email: auth.email,
      pass: auth.pass,
      ns: auth.namespace,
      db: auth.database,
      sc: auth.scope,
    },
  });
  return {
    ...parseMeta(response),
    ...(await response.json()),
  };
};

export const fetchQuery = async (conn: Connection, query: string) => {
  const response = await doFetch('sql', {
    headers: {
      NS: conn.namespace,
      DB: conn.database,
      Authorization: `Bearer ${conn.token}`,
    },
    body: query,
  });
  const result = await response.json();
  return {
    ...parseMeta(response),
    ...result,
  };
};
