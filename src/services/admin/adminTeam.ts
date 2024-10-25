import { TeamMember } from '../../types/TeamMember';
import { adminClient } from '../../utils/httpAdminClient';

export const adminTeam = {
  async get(token: string) {
    return adminClient.get<TeamMember[]>('team', token);
  },
  async delete(id: string, token: string) {
    return adminClient.delete<TeamMember>(`team/${id}`, token);
  },
  async post(data: FormData, token: string) {
    return adminClient.post<TeamMember>(`team`, token, data);
  },
  async update(id: number, data: FormData, token: string) {
    return adminClient.update(`team/${id}`, token, data);
  },
};
