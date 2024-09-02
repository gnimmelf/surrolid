import { boolean, z } from 'zod';
import { Surreal } from "surrealdb";
import { awaitCondition, logError, unpackResult, zodSchemaDefaults } from "../lib/utils";
import { StateCreator, StateGetter, StateSetter } from './types';

export const DbSchema = z.object({
  isConnected: z.boolean().default(false),
});

export type DbParams = {
  datapoint: string
  namespace: string
  database: string
}

export type DbState = z.infer<typeof DbSchema>;

/**
 * Class
 */
class DbService {
  #db: Surreal;
  #url: string
  #namespace: string
  #database: string
  #setState: StateSetter<DbState>
  state: StateGetter<DbState>

  constructor(
    dbParams: DbParams,
    useState:StateCreator<DbState>
  ) {
    this.#db = new Surreal()
    this.#url = new URL(`${dbParams.datapoint}/rpc`).toString()
    this.#namespace = dbParams.namespace
    this.#database = dbParams.database

    const [state, setState] = useState(zodSchemaDefaults(DbSchema))
    this.#setState = setState
    this.state = state
  }

  async connect(): Promise<DbService> {
    try {
      console.info("Connecting Surrealdb...")
      await this.#db.connect(this.#url, {
        namespace: this.#namespace,
        database: this.#database,
      });
    } catch (error) {
      logError(error as Error)
      throw error;
    }
    this.#setState((prev) => ({
      ...prev,
      isConnected: true
    }))
    console.info(`DbService connected: ${this.#database}@${this.#namespace}:${this.#url}`)
    console.log(this.#db)
    return this
  }

  async disconnect(): Promise<void> {
    if (this.#db.status === 'connected') {
      await this.#db.close();
    }
    this.#setState((prev) => ({
      ...prev,
      isConnected: false
    }))
  }

  async getDb(): Promise<Surreal> {
    await awaitCondition(() => this.state().isConnected && this.#db.status === 'connected')
    return this.#db
  }

  async getAccountDetails() {
    try {
      const result = await this.#db.query('SELECT email FROM account;')
      return unpackResult(result)
    } catch (err) {
      throw err;
    }
  }

  async setAccountDetails<T>(details: T) {
    try {
      await this.#db.merge<any, any>('account', details)
    } catch (err) {
      throw err;
    }
  }

  async getProfileDetails() {
    try {
      const result = await this.#db.query('SELECT firstName, lastName, address, phone  FROM profile;')
      return unpackResult(result)
    } catch (error) {
      throw error;
    }
  }

  async setProfileDetails<T>(details: T) {
    try {
      await this.#db.merge<any, any>('profile', details)
    } catch (err) {
      throw err;
    }
  }


}

export default DbService