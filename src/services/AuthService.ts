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

const initialState = () => ({
  accessToken: '',
});

class AuthService {
  #dbService: DbService
  #authParams: TAuthParams
  #accessToken: string

  constructor(dbService: DbService, authParams: TAuthParams) {
    this.#dbService = dbService
    this.#authParams = authParams
    this.#accessToken = ''
  }

  async signup(credentials: TCredentials) {
    const db = this.#dbService.getDb()
    try {
      this.#accessToken = await db.signup({
        NS: this.#authParams.namespace,
        DB: this.#authParams.database,
        SC: this.#authParams.scope,
        email: credentials.email,
        pass: credentials.pass,
      })
    } catch (err) {
      throw err;
    }
  }

  async signin(credentials: TCredentials) {
    const db = this.#dbService.getDb()
    try {
      this.#accessToken = await db.signin({
        NS: this.#authParams.namespace,
        DB: this.#authParams.database,
        SC: this.#authParams.scope,
        email: credentials.email,
        pass: credentials.pass,
      })
    } catch (err) {
      throw err;
    }
  }

  async authenticate(accessToken: string) {
    const db = this.#dbService.getDb()
    try {
      await db.authenticate(accessToken)
    } catch (err) {
      throw err;
    }
    this.#accessToken = accessToken
  }

  async signout() {
    const db = this.#dbService.getDb()
    this.#accessToken = ''
    await db.invalidate()
  }

  get isAuthenticated() {
    return this.#dbService.isConnected() && !!this.#accessToken
  }
}

export default AuthService;
