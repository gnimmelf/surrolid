import { boolean, z } from 'zod';
import { Observable } from '../lib/Observable';
import DbService from './DbService';
import { logError } from '../lib/utils';

type TAuthParams = {
  namespace: string
  database: string
  scope: string
}

export type TCredentials = {
  email: string;
  pass: string;
};

export const AuthSchema = z.object({
  isAuthenticated: z.boolean(),
});

export type TAuth = z.infer<typeof AuthSchema>;

const initialState = () => ({
  isAuthenticated: false
})

class AuthService extends Observable {
  #dbService: DbService
  #authParams: TAuthParams
  #accessToken: string

  constructor(dbService: DbService, authParams: TAuthParams) {
    super(initialState());
    this.#dbService = dbService
    this.#authParams = authParams
    this.#accessToken = ''
  }

  #storeAccessToken() {
    localStorage.accessToken = this.#accessToken
  }

  async authenticate() {
    if (localStorage.accessToken) {
      const db = await this.#dbService.getDb()
      this.#accessToken = localStorage.accessToken
      try {
        console.info('Authenticating token from localStorage...')
        await db.authenticate(this.#accessToken)
      } catch (error) {
        logError(error as Error)
        return this.signout();
      }
      this.setState({
        isAuthenticated: this.isAuthenticated
      })
    }
  }

  async signup(credentials: TCredentials) {
    const db = await this.#dbService.getDb()
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
    this.setState({
      isAuthenticated: this.isAuthenticated
    })
  }

  async signin(credentials: TCredentials) {
    const db = await this.#dbService.getDb()
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
    this.setState({
      isAuthenticated: this.isAuthenticated
    })
  }

  async signout() {
    this.#accessToken = ''
    this.#storeAccessToken()
    const db = await this.#dbService.getDb()
    await db.invalidate()
    this.setState({
      isAuthenticated: this.isAuthenticated
    })
  }

  get isAuthenticated() {
    return !!this.#accessToken && this.#dbService.isConnected
  }
}

export default AuthService;
