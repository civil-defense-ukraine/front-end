import { FormFields } from '../../types/FormFields';
import { publicClient } from '../../utils/httpPublicClient';

export const form = {
  post(data: FormFields) {
    return publicClient.post<any>('form', data);
  },
};
