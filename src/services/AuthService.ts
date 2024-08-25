import { Observable } from '../lib/utils';
import DbService from './DbService';


export type TCredentials = {
  email: string;
  pass: string;
};

type TAuthParams = {
  namespace: string
  database: string
  scope: string
}

class AuthService extends Observable {
  #dbService: DbService
  #authParams: TAuthParams
  #accessToken: string

  constructor(dbService: DbService, authParams: TAuthParams) {
    super();
    this.#dbService = dbService
    this.#authParams = authParams
    this.#accessToken = ''
  }

  #storeAccessToken() {
    localStorage.accessToken = this.#accessToken
  }

  async signup(credentials: TCredentials) {
    console.log('signup', this.#dbService, credentials)
    const db = this.#dbService.getDb()
    try {
      this.#accessToken = await db.signup({
        namespace: this.#authParams.namespace,
        database: this.#authParams.database,
        scope: this.#authParams.scope,
        email: credentials.email,
        pass: credentials.pass,
      })
    } catch (err) {
      throw err;
    }
    this.#storeAccessToken()
    this.next({
      isAuthenticated: this.isAuthenticated
    })
  }

  async signin(credentials: TCredentials) {
    console.log('signin', this.#dbService, credentials)
    const db = this.#dbService.getDb()
    try {
      this.#accessToken = await db.signin({
        namespace: this.#authParams.namespace,
        database: this.#authParams.database,
        scope: this.#authParams.scope,
        email: credentials.email,
        pass: credentials.pass,
      })
    } catch (err) {
      throw err;
    }
    this.#storeAccessToken()
    this.next({
      isAuthenticated: this.isAuthenticated
    })
  }

  async authenticate() {
    if (localStorage.accessToken) {
      this.#accessToken = localStorage.accessToken
      const db = this.#dbService.getDb()
      try {
        await db.authenticate(this.#accessToken)
      } catch (err) {
        return this.signout();
      }
      this.next({
        isAuthenticated: this.isAuthenticated
      })
    }
  }

  async signout() {
    this.#accessToken = ''
    this.#storeAccessToken()
    const db = this.#dbService.getDb()
    await db.invalidate()
    this.next({
      isAuthenticated: this.isAuthenticated
    })
  }

  get isAuthenticated() {
    return !!this.#accessToken && this.#dbService.isConnected
  }
}

export default AuthService;
