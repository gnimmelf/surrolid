import { z } from 'zod';

import { name, address, phone, checkLoadedData } from '../lib/fields';
import DbService from './DbService';
import { zodSchemaDefaults } from '../lib/utils';
import { StateCreator, StateGetter, StateSetter } from './types';

export const ProfileSchema = z.object({
  firstName: name.default(''),
  lastName: name.default(''),
  address: address.default(''),
  phone: phone.default(''),
});
const LoadSchema = ProfileSchema

export type ProfileState = z.infer<typeof ProfileSchema>;

/**
 * Class
 */
class ProfileService {
  #dbService: DbService
  #setState: StateSetter<ProfileState>
  state: StateGetter<ProfileState>

  constructor(
    dbService: DbService,
    useState: StateCreator<ProfileState>
  ) {
    this.#dbService = dbService

    const [state, setState] = useState(zodSchemaDefaults(ProfileSchema))
    this.#setState = setState
    this.state = state
  }

  async loadData(): Promise<void> {
    const details = await  this.#dbService.getProfileDetails() as ProfileState
    checkLoadedData(LoadSchema, details)
    this.#setState(details)
  }

  async saveData(details: ProfileState): Promise<void> {
    await this.#dbService.setProfileDetails(details)
    this.#setState(details)
  }
}

export default ProfileService;
