import { z } from 'zod';

import { checkLoadedData, email, pass } from '../lib/fields';
import DbService from './DbService';
import { Observable } from '../lib/Observable';

export const AccountSchema = z.object({
  email,
  pass,
});

const LoadSchema = AccountSchema.omit({ pass: true })

export type TAccount = z.infer<typeof AccountSchema>;

const initialState = (): TAccount => ({
  email: '',
  pass: ''
});

class AccountService extends Observable {
  #dbService: DbService

  constructor(dbService: DbService) {
    super(initialState());
    this.#dbService = dbService
  }

  async loadData(): Promise<void> {
    const details = await this.#dbService.getAccountDetails()
    checkLoadedData(LoadSchema, details)
    this.setState(details)
  }

  async saveData(details: TAccount): Promise<void> {
    await this.#dbService.setAccountDetails(details)
    this.setState(details)  }
}

export default AccountService;
