import { publicClient } from '../../utils/httpPublicClient';

export const activeDonation = {
  async get() {
    return publicClient.get<{ image: string; description: string }>(
      'fundraising',
    );
  },
};
