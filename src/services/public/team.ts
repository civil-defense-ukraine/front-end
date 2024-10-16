import { TeamMember } from '../../types/TeamMember';
import { publicClient } from '../../utils/httpPublicClient';

export const team = {
  async get() {
    return publicClient.get<TeamMember[]>('team');
  },
};
