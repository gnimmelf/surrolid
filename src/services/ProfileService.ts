import { z } from 'zod';

import { name, address, phone, validateValues } from '../lib/fields';
import DbService from './DbService';

export const ProfileSchema = z.object({
  firstName: name,
  lastName: name,
  address,
  phone,
});

export type TProfile = z.infer<typeof ProfileSchema>;

const initialState = (): TProfile => ({
  firstName: '',
  lastName: '',
  address: '',
  phone: '',
});

class ProfileService {
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
    const details = this.#dbService.getProfileDetails()
    this.#state = details as unknown as TProfile
  }

  async saveData(details: TProfile): Promise<void> {
    const db = this.#dbService.setProfileDetails(details)
  }
}

export default ProfileService;
