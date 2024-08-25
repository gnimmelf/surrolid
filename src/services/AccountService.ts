import { z } from 'zod';

import { email, pass } from '../lib/fields';
import DbService from './DbService';
import { Observable } from '../lib/utils';

export const AccountSchema = z.object({
  email,
  pass,
});

export type TAccount = z.infer<typeof AccountSchema>;

const initialState = (): TAccount => ({
  email: '',
  pass: ''
});

class AccountService extends Observable {
  #dbService: DbService
  #state = initialState()

  constructor(dbService: DbService) {
    super();
    this.#dbService = dbService
  }

  get initialState() {
    return initialState()
  }

  get state() {
    return structuredClone(this.#state)
  }

  async loadData(): Promise<void> {
    const details = await this.#dbService.getAccountDetails()
    this.#state = details as unknown as TAccount
    this.next(this.state)
  }

  async saveData(details: TAccount): Promise<void> {
    const db = await this.#dbService.setAccountDetails(details)
  }
}

export default AccountService;
