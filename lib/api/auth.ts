import {AppRouterInstance} from 'next/dist/shared/lib/app-router-context.shared-runtime';

export const loginUserAPI = async (login: string, password: string) => {
  const res = await fetch('/api/auth/login', {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({login, password}),
  });

  if (!res.ok) {
    if (res.status === 401) {
      throw new Error('Wrong login or password');
    }
    throw new Error('Server error, try again later');
  }

  return res.json();
};

export const registerUserAPI = async (
  login: string,
  password: string,
  firstName: string,
  lastName: string,
  setFetchError: (status: boolean) => void,
  resetFormHandler: () => void,
  resetFormsStatusHandler: () => void,
  router: AppRouterInstance
) => {
  const res = await fetch('/api/auth/register', {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({
      login: login,
      password: password,
      firstName: firstName,
      lastName: lastName,
    }),
  });

  if (!res.ok) {
    setFetchError(true);
    resetFormHandler();
    resetFormsStatusHandler();
    router.push('/register');
    return;
  }
};

export const logoutUserAPI = async () => {
  await fetch('/api/auth/logout', {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
  });
};
