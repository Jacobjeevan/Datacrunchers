import axios from "axios";

export async function loginUser(body) {
  const res = await axios.post(`${process.env.REACT_APP_API_URL}login/`, body);
  return res.data;
}

export async function logoutUser() {
  const res = await axios.get(`${process.env.REACT_APP_API_URL}logout/`);
  return res.data;
}

export async function registerUser(body) {
  const res = await axios.get(
    `${process.env.REACT_APP_API_URL}register/`,
    body
  );
  return res.data;
}
