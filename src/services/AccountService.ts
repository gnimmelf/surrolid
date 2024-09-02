import { z } from 'zod';

import { checkLoadedData, email, pass } from '../lib/fields';
import DbService from './DbService';
import { StateCreator, StateGetter, StateSetter } from './types';
import { zodSchemaDefaults } from '../lib/utils';

export const AccountSchema = z.object({
  email: email.default(''),
  pass: pass.default(''),
});
const LoadSchema = AccountSchema.omit({ pass: true })

export type AccountState = z.infer<typeof AccountSchema>;

/**
 * Class
 */
class AccountService {
  #dbService: DbService
  #setState: StateSetter<AccountState>
  state: StateGetter<AccountState>

  constructor(
    dbService: DbService,
    useState: StateCreator<AccountState>
  ) {
    this.#dbService = dbService

    const [state, setState] = useState(zodSchemaDefaults(AccountSchema))
    this.#setState = setState
    this.state = state
  }

  async loadData(): Promise<void> {
    const details = await this.#dbService.getAccountDetails() as AccountState
    checkLoadedData(LoadSchema, details)
    this.#setState(details)
  }

  async saveData(details: AccountState): Promise<void> {
    await this.#dbService.setAccountDetails(details)
    this.#setState(details)
  }
}

export default AccountService;
