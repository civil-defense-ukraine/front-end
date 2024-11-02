import { adminClient } from '../../utils/httpAdminClient';

export const adminActiveDonation = {
  async post(data: FormData, token: string) {
    return adminClient.post(`fundraising`, token, data);
  },
};
