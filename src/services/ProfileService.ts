import { z } from 'zod';

import { name, address, phone, checkLoadedData } from '../lib/fields';
import DbService from './DbService';
import { Observable } from '../lib/Observable';

export const ProfileSchema = z.object({
  firstName: name,
  lastName: name,
  address,
  phone,
});

const LoadSchema = ProfileSchema

export type TProfile = z.infer<typeof ProfileSchema>;

const initialState = (): TProfile => ({
  firstName: '',
  lastName: '',
  address: '',
  phone: '',
});

class ProfileService extends Observable{
  #dbService: DbService

  constructor(dbService: DbService) {
    super(initialState());
    this.#dbService = dbService
  }

  async loadData(): Promise<void> {
    const details = await  this.#dbService.getProfileDetails()
    checkLoadedData(LoadSchema, details)
    this.setState(details)
  }

  async saveData(details: TProfile): Promise<void> {
    await this.#dbService.setProfileDetails(details)
    this.setState(details)
  }
}

export default ProfileService;
