import { ElearningApi } from '../../../services/apiElearning';
export async function googleLogin() {
  await ElearningApi.get('auth/login/google');
}

export async function login(email: string, password: string) {
  const { data } = await ElearningApi.post('auth/login', {
    email,
    password,
  });

  return data;
}

export async function signup(user: any) {
  const { firstName, lastName, email, password } = user;

  const { data } = await ElearningApi.post('auth/signup', {
    firstName,
    lastName,
    email,
    password,
  });

  return data;
}

export async function getCurrentUser() {
  const { data } = await ElearningApi.get('auth/current');
  return data;
}

export async function logout() {
  await ElearningApi.get('auth/logout');
}
