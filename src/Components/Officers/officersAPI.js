import useSWR from "swr";
import { axiosInstance } from "../common/Axios";

export function useGetOfficers() {
  const { data, error, mutate } = useSWR("officerData", () =>
    axiosInstance.get("officers/").then((res) => res.data)
  );
  return {
    data,
    isLoading: !error && !data,
    error,
    mutate,
  };
}

export async function addOfficer(body) {
  let response;
  try {
    response = await axiosInstance.post("officers/add", body);
  } catch (error) {
    response = error.response;
  }
  return response.data;
}

export async function deleteOfficer(id) {
  let response;
  try {
    response = await axiosInstance.delete(`officers/delete/${id}`);
  } catch (error) {
    response = error.response;
  }
  return response.data;
}

export async function updateOfficer(id, body) {
  let response;
  try {
    response = await axiosInstance.post(`officers/update/${id}`, body);
  } catch (error) {
    response = error.response;
  }
  return response.data;
}
