// src/utils/api.js

const BASE_URL = 'http://localhost:8080';

const getHeaders = (auth = false) => {
  const headers = {};
  if (auth) {
    const token = localStorage.getItem('token');
    if (token) headers['Authorization'] = `Bearer ${token}`;
  }
  return headers;
};

const handleResponse = async (res) => {
  const data = await res.json();
  if (!res.ok) throw data;
  return data;
};

const api = {
  get: async (path, auth = false) =>
    fetch(BASE_URL + path, { headers: getHeaders(auth) }).then(handleResponse),
  post: async (path, data, auth = false) =>
    fetch(BASE_URL + path, {
      method: 'POST',
      headers: { ...getHeaders(auth), 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    }).then(handleResponse),
  put: async (path, data, auth = false) =>
    fetch(BASE_URL + path, {
      method: 'PUT',
      headers: { ...getHeaders(auth), 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    }).then(handleResponse),
  delete: async (path, auth = false) =>
    fetch(BASE_URL + path, {
      method: 'DELETE',
      headers: getHeaders(auth),
    }).then(handleResponse),
};

export default api;
