import { z } from 'zod';

import { name, address, phone, checkLoadedData } from '../lib/fields';
import DbService from './DbService';
import { Observable } from '../lib/utils';

export const ProfileSchema = z.object({
  firstName: name,
  lastName: name,
  address,
  phone,
});

const DataSchema = ProfileSchema

export type TProfile = z.infer<typeof ProfileSchema>;

const initialState = (): TProfile => ({
  firstName: '',
  lastName: '',
  address: '',
  phone: '',
});

class ProfileService extends Observable{
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
    const details = await  this.#dbService.getProfileDetails()
    checkLoadedData(DataSchema, details)
    this.#state = details as unknown as TProfile
    this.next(this.state)
  }

  async saveData(details: TProfile): Promise<void> {
    await this.#dbService.setProfileDetails(details)
    this.#state = details as unknown as TProfile
    this.next(this.state)
  }
}

export default ProfileService;
