import { z } from 'zod';
import DbService from './DbService';
import { logError, zodSchemaDefaults } from '../lib/utils';
import { StateCreator, StateGetter, StateSetter } from './types';
import { email, pass } from '../lib/fields';

export const AuthSchema = z.object({
  isAuthenticated: z.boolean().default(false),
});
export const CredentialsSchema = z.object({
  email: email.default(''),
  pass: pass.default(''),
});

export type AuthParams = {
  namespace: string
  database: string
  scope: string
}

export type Credentials = {
  email: string;
  pass: string;
};

export type AuthState = z.infer<typeof AuthSchema>;

/**
 * Class
 */
class AuthService {
  #dbService: DbService
  #authParams: AuthParams
  #accessToken: string
  #setState: StateSetter<AuthState>
  state: StateGetter<AuthState>

  constructor(
    dbService: DbService,
    authParams: AuthParams,
    useState:StateCreator<AuthState>
  ) {
    this.#dbService = dbService
    this.#authParams = authParams
    this.#accessToken = ''

    const [state, setState] = useState(zodSchemaDefaults(AuthSchema))
    this.#setState = setState
    this.state = state
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
      this.#setState((prev) => ({
        ...prev,
        isAuthenticated: this.#isAuthenticated
      }))
    }
  }

  async signup(credentials: Credentials) {
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
    this.#setState((prev) => ({
      ...prev,
      isAuthenticated: this.#isAuthenticated
    }))
  }

  async signin(credentials: Credentials) {
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
    this.#setState((prev) => ({
      ...prev,
      isAuthenticated: this.#isAuthenticated
    }))
  }

  async signout() {
    this.#accessToken = ''
    this.#storeAccessToken()
    const db = await this.#dbService.getDb()
    await db.invalidate()
    this.#setState((prev) => ({
      ...prev,
      isAuthenticated: this.#isAuthenticated
    }))
  }

  get #isAuthenticated() {
    return !!this.#accessToken && this.#dbService.state().isConnected
  }
}

export default AuthService;
