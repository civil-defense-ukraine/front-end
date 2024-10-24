const BASE_URL = 'https://cdu-backend-5gvnird6ya-lz.a.run.app/api/auth/login';

export async function requestToAuth<T>(data: {
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
  console.log(`${BASE_URL}`, options);

  return fetch(`${BASE_URL}`, options).then(response => {
    console.log(response);

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
