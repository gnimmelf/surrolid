import { unWrapQueryData } from '../lib/utils';
import { AuthenticationError, RecordError, ServiceError } from './errors';

export type TConnection = {
  namespace: string;
  database: string;
  scope: string;
  token: string;
  apibaseurl: string;
};

export type TAuth = {
  method: string;
  email: string;
  pass: string;
};

type TMeta = Pick<
  Response,
  'headers' | 'ok' | 'redirected' | 'status' | 'statusText' | 'type' | 'url'
>;

const parseMeta = (response: Response, extra?: Record<string, any>): TMeta => {
  const { headers, ok, redirected, status, statusText, type, url } = response;
  return {
    headers,
    ok,
    redirected,
    status,
    statusText,
    type,
    url,
    ...extra,
  };
};

const doFetch = async (
  apibaseurl: string,
  urlPath: string,
  { headers = {}, body = {} } = {}
) => {
  const url = new URL(`${apibaseurl}/${urlPath}`);
  url.pathname = url.pathname.replace('//', '/');
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      ...headers,
      Accept: 'application/json',
    },
    body: typeof body === 'string' ? body : JSON.stringify(body),
  });

  if (response.status >= 500) {
    throw new ServiceError(
      `Error fetching ${response.url}: ${response.status} - ${response.statusText}`
    );
  }
  return response;
};

export const fetchToken = async (conn: TConnection, auth: TAuth) => {
  const response: Response = await doFetch(conn.apibaseurl, auth.method, {
    body: {
      email: auth.email,
      pass: auth.pass,
      ns: conn.namespace,
      db: conn.database,
      sc: conn.scope,
    },
  });
  const payload = await response.json();
  if (!response.ok) {
    throw new AuthenticationError(payload.details);
  }
  return {
    meta: parseMeta(response),
    data: payload,
  };
};

export const fetchQuery = async (
  conn: TConnection,
  query: string,
  token?: string
) => {
  const response = await doFetch(conn.apibaseurl, 'sql', {
    headers: {
      NS: conn.namespace,
      DB: conn.database,
      Authorization: `Bearer ${token}`,
    },
    body: query,
  });
  const payload = await response.json();
  if (!response.ok) {
    if (response.status === 403) {
      throw new AuthenticationError(payload.details);
    }
    throw new RecordError(payload.details);
  }

  const data = payload.map((dataSet: { result: unknown }) => {
    if (dataSet.status === 'ERR') {
      throw new RecordError(dataSet.detail);
    }
    return dataSet.result;
  });

  console.log('Awaiting', query);
  return new Promise((resolve) =>
    setTimeout(() => {
      console.log('Resovled', query);
      resolve({
        meta: parseMeta(response, { query }),
        data: unWrapQueryData(data),
      });
    }, 2000)
  );
};
