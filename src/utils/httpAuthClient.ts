const BASE_URL =
  'https://cdu-backend-service-latest-ed3x.onrender.com/api/auth/login';

export async function requestToAuth(data: {
  email: string;
  password: string;
}): Promise<{ token: string }> {
  const options: RequestInit = { method: 'POST' };

  if (data) {
    options.body = JSON.stringify(data);
    options.headers = {
      'Content-Type': 'application/json; charset=utf-8',
    };
  }

  return fetch(`${BASE_URL}`, options).then(response => {
    if (!response.ok) {
      throw new Error(response.statusText);
    }
    const contentType = response.headers.get('content-type');

    if (contentType && contentType.includes('application/json')) {
      return response.json();
    }

    return response.status;
  });
}
