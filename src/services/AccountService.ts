import { z } from 'zod';

import { email, pass, validateValues } from '../lib/fields';
import DbService from './DbService';

export const AccountSchema = z.object({
  email,
  pass,
});

export type TAccount = z.infer<typeof AccountSchema>;

const initialState = (): TAccount => ({
  email: '',
  pass: ''
});

class AccountService {
  #dbService: DbService
  #state = initialState()

  constructor(dbService: DbService) {
    this.#dbService = dbService
  }

  get initialState() {
    return initialState()
  }

  get state() {
    return structuredClone(this.#state)
  }

  async loadData(): Promise<void> {
    const details = this.#dbService.getAccountDetails()
    this.#state = details as unknown as TAccount
  }

  async saveData(details: TAccount): Promise<void> {
    const db = this.#dbService.setAccountDetails(details)
  }
}

export default AccountService;
