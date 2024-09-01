import {
  Component,
  createEffect,
  createResource,
  createSignal,
  For,
} from 'solid-js';

import customStyles from './app.css?inline';

import {
  ServiceProvider,
  useService,
} from './ServiceProvider';
import { noop } from '../lib/utils';
import { Uuid } from 'surrealdb';
import { createStore } from 'solid-js/store';

const TABLE_ACCOUNTS = 'demo_accounts'

type TAccount = {
  email: string
  pass: string
  id: string
}


const App: Component<{
  title: string;
}> = (props) => {
  const { db } = useService();

  const [liveId, setLiveId] = createSignal<Uuid>()
  const [state, setState] = createStore<{
    accounts: Record<string, TAccount>
  }>({
    accounts: {}
  })

  const __setupLiveQuery = async () => {
    // TODO! Needs newer version of SurrealDb to trigger on `SIGNUP` with `$values`
    const _db = await db.getDb()
    const uuid = await _db.live<TAccount>(TABLE_ACCOUNTS, (action, result) => {
      console.log(`LiveQuery recieved ${action}`)
      if (action === 'CLOSE') return;
      setState('accounts', (prev): Record<string, TAccount> => {
        console.log({ prev })
        return {
          ...prev,
          [result.email]: result
        }
      })
    })
    setLiveId(uuid)
  }

  const getAccounts = async() => {
    const _db = await db.getDb()
    const result = await _db.select<TAccount>(TABLE_ACCOUNTS)
    setState('accounts', result.reduce((acc, result) => {
      return {
        ...acc,
        [result.id]: result
      }
    }, {}))
  }

  const [loadData] = createResource(
    async () => true,
    async () => {
      const _db = await db.getDb()
      const id = getAccounts()
      setLiveId(id as unknown as Uuid)
    }
  )

  return (
    <main class="app">
      {noop(loadData)}
      <style data-name="custom">{customStyles}</style>
      <section>
        <div class="heading">
          <h1>{props.title}</h1>
        </div>
        <table>
          <caption>
            Available logins
          </caption>
          <thead>
            <tr>
              <th>Email</th>
              <th>pass</th>
            </tr>
          </thead>
          <tbody>
            <For each={Object.values(state.accounts)}>
              {(account: TAccount) => (
                <tr>
                  <td>{account.email}</td>
                  <td>{account.pass}</td>
                </tr>
              )}
            </For>
          </tbody>
        </table>
      </section>
    </main>
  );
};

const AppRoot: Component<{
  datapoint: string;
  title: string;
  namespace: string;
  database: string;
  scope: string;
}> = (props) => {
  return (
    <ServiceProvider
      namespace={props.namespace}
      database={props.database}
      datapoint={props.datapoint}
    >
      <App title={props.title} />
    </ServiceProvider>
  );
};

export default AppRoot;
