import { request } from 'umi';

export async function login(body, options) {
  return request('/api/user/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

export async function currentUser(options) {
  return request('/api/user/info', {
    method: 'GET',
    ...(options || {}),
  });
}
