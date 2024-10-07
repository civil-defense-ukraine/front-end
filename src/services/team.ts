import { TeamMember } from '../types/TeamMember';
import { client } from '../utils/httpClient';

export const team = {
  async get() {
    return client.get<TeamMember[]>('team.json');
  },
};
