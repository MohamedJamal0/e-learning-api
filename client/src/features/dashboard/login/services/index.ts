import { ElearningApi } from '../../../../services/apiElearning';

export const adminLogin = async (username: string, password: string) => {
  const { data } = await ElearningApi.post('auth/admin/login', {
    username,
    password,
  });

  return data;
};
