import axios from "axios";
const user = JSON.parse(localStorage.getItem("user"));
const TOKEN = user?.accessToken;

export const publicRequest = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
});

export const privateRequest = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
  headers: {
    token: `Bearer ${TOKEN}`,
  },
});
