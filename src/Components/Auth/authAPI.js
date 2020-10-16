import { axiosInstance } from "../common/Axios";

export async function loginUser(body) {
  let response;
  try {
    response = await axiosInstance.post("login/", body);
  } catch (error) {
    response = error.response;
  }
  return response.data;
}

export async function logoutUser() {
  let response;
  try {
    response = await axiosInstance.post("logout/");
  } catch (error) {
    response = error.response;
  }
  return response.data;
}

export async function registerUser(body) {
  let response;
  try {
    response = await axiosInstance.post("register/", body);
  } catch (error) {
    response = error.response;
  }
  return response.data;
}

export async function getUser() {
  let response;
  try {
    response = await axiosInstance.post("user/");
    return response.data;
  } catch (error) {
    return null;
  }
}
