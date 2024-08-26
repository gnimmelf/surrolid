import { Surreal } from "surrealdb";
import { awaitCondition, Observable, unpackResult } from "../lib/utils";

class DbService extends Observable {
  #db: Surreal;
  #url: string
  #namespace: string
  #database: string
  #isConnected: boolean

  constructor(datapoint: string, namespace: string, database: string) {
    super();
    this.#db = new Surreal()
    this.#url = new URL(`${datapoint}/rpc`).toString()
    this.#namespace = namespace
    this.#database = database
    this.#isConnected = false
  }

  async connect(): Promise<DbService> {
    try {
      console.info("Connecting Surrealdb...")
      await this.#db.connect(this.#url, {
        namespace: this.#namespace,
        database: this.#database,
      });
    } catch (error) {
      console.error(error)
      throw error;
    }
    this.#isConnected = true
    console.info(`DbService connected: ${this.#database}@${this.#namespace}:${this.#url}`)
    return this
  }

  async disconnect(): Promise<void> {
    if (this.#db.status === 'connected') {
      await this.#db.close();
    }
    this.#isConnected = false
  }

  async getDb(): Promise<Surreal> {
    await awaitCondition(() => this.#db.status === 'connected')
    return this.#db
  }

  get isConnected(): boolean {
    return this.#isConnected
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
      const result = await this.#db.merge('account', details)
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
      await this.#db.merge('profile', details)
    } catch (err) {
      throw err;
    }
  }


}

export default DbService