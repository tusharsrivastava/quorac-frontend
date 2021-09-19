import axios from 'axios';

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  // baseURL: 'http://localhost:3000/',
  // baseURL: "https://quorac-api.herokuapp.com/",
});

export const getHeaders = () => {
  const token = localStorage.getItem("token");
  console.log('Token', token);
  const headers = {};

  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  return headers;
}

export const get = async (url) => {
  try {
    return await api.get(url, {
      headers: getHeaders(),
    });
  } catch (error) {
    if (error.response.status === 401) {
      window.location.href = "/auth/login";
    }
    throw error;
  }
}

export const post = async (url, data) => {
  try {
    return await api.post(url, data, {
      headers: getHeaders(),
    });
  } catch (error) {
    if (error.response.status === 401) {
      window.location.href = "/auth/login";
    }
    throw error;
  }
};

export default api;
