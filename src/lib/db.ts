import { AuthenticationError, RecordError, ServiceError } from './errors';

export type Connection = {
  namespace: string;
  database: string;
  scope: string;
  token: string;
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
  const response = await fetch(`https://data.intergate.io/${urlPath}`, {
    method: 'POST',
    headers: {
      ...headers,
      Accept: 'application/json',
    },
    body: typeof body === 'string' ? body : JSON.stringify(body),
  });

  if (response.status >= 500) {
    throw new ServiceError(
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
  const payload = await response.json();
  if (!response.ok) {
    throw new AuthenticationError(payload.details);
  }
  return {
    ...parseMeta(response),
    ...payload,
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
  const payload = await response.json();
  if (!response.ok) {
    throw new RecordError(payload.details);
  }

  const data = payload.map((dataSet) => dataSet.result);

  console.log({ payload, data });

  return {
    ...parseMeta(response),
    data: data.length === 1 ? data[0] : data,
  };
};
