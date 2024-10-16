const BASE_URL = 'http://localhost:8088/api/public';

export async function request<T>(
  path: string,
  method = 'GET',
  data?: any,
): Promise<T> {
  const options: RequestInit = { method };

  if (data !== undefined) {
    options.body = JSON.stringify(data);
    options.headers = {
      'Content-Type': 'application/json; charset=utf-8',
    };
  }

  return fetch(`${BASE_URL}/${path}`, options).then(response => {
    if (!response.ok) {
      throw new Error(response.statusText);
    }

    return response.json();
  });
}

export const publicClient = {
  get<T>(url: string) {
    return request<T>(url);
  },
  delete<T>(url: string) {
    return request<T>(url, 'DELETE');
  },
  post<T>(url: string, data: T) {
    return request<T>(url, 'POST', data);
  },
};
