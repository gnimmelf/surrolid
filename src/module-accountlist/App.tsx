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

const TABLE_ACCOUNTS = 'account'

type TAccount = Record<string, unknown>


const App: Component<{
  title: string;
}> = (props) => {
  const { db } = useService();

  const [liveId, setLiveId] = createSignal<Uuid>()
  const [state, setState] = createStore<{
    accounts: TAccount[]
  }>({
    accounts: []
  })

  createEffect(() => console.log(state))

  const [initLiveQuery] = createResource(
    async () => true,
    async () => {
      const _db = await db.getDb()
      const result = await _db.select(TABLE_ACCOUNTS)
      setState('accounts', result)

      const uuid = await _db.live(TABLE_ACCOUNTS, (action, result) => {
        console.log(`LiveQuery recieved ${action}`)
        if (action === 'CLOSE') return;
        setState('accounts', (prev) => [
          ...prev,
          result
        ])
      })
      setLiveId(uuid)
    }
  )

  return (
    <main class="app">
      {noop(initLiveQuery)}
      <style data-name="custom">{customStyles}</style>
      <section>
        <div class="heading">
          <h1>{props.title}</h1>
          <p>{liveId()?.toString()}</p>
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
            <For each={state.accounts}>
              {({ email, pass }) => (
                <tr>
                  <td>{email}</td>
                  <td>{pass}</td>
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
