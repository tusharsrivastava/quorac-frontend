import axios from 'axios';

const api = axios.create({
  // baseURL: 'http://localhost:3000/',
  baseURL: "https://quorac-api.herokuapp.com/",
});

export const getHeaders = () => {
  const token = localStorage.getItem("token");
  const headers = {};

  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  return headers;
}

export const get = async (url) => {
  return await api.get(url, {
    headers: getHeaders(),
  });
}

export const post = async (url, data) => {
  return await api.post(url, data, {
    headers: getHeaders(),
  });
};

export default api;
