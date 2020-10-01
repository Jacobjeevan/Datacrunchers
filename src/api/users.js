import axios from "axios";

axios.defaults.withCredentials = true;

export async function loginUser(body) {
  const res = await axios.post(`${process.env.REACT_APP_API_URL}login/`, body);
  return res.data;
}

export async function logoutUser() {
  const res = await axios.get(`${process.env.REACT_APP_API_URL}logout/`);
  return res.data;
}

export async function registerUser(body) {
  const res = await axios.post(
    `${process.env.REACT_APP_API_URL}register/`,
    body
  );
  return res.data;
}

export async function getUser() {
  const res = await axios.get(`${process.env.REACT_APP_API_URL}user/`);
  if (res.data) {
    return res.data;
  } else {
    return null;
  }
}
