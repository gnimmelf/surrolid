import { z } from 'zod';

import { checkLoadedData, email, pass } from '../lib/fields';
import DbService from './DbService';
import { Observable } from '../lib/utils';

export const AccountSchema = z.object({
  email,
  pass,
});

const DataSchema = AccountSchema.omit({ pass: true })

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

  get state() {
    return structuredClone(this.#state)
  }

  async loadData(): Promise<void> {
    const details = await this.#dbService.getAccountDetails()
    checkLoadedData(DataSchema, details)
    this.#state = details as unknown as TAccount
    this.next(this.state)
  }

  async saveData(details: TAccount): Promise<void> {
    await this.#dbService.setAccountDetails(details)
    this.#state = details as unknown as TAccount
    this.next(this.state)
  }
}

export default AccountService;
