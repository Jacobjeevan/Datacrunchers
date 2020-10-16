import useSWR from "swr";
import { axiosInstance } from "../common/Axios";

export function useGetResources() {
  const { data, error, mutate } = useSWR("resourceData", () =>
    axiosInstance.get("resources/").then((res) => res.data)
  );
  return {
    data,
    isLoading: !error && !data,
    error,
    mutate,
  };
}

export async function addResource(body) {
  let response;
  try {
    response = await axiosInstance.post("resources/add", body);
  } catch (error) {
    response = error.response;
  }
  return response.data;
}

export async function deleteResource(id) {
  let response;
  try {
    response = await axiosInstance.delete(`resources/delete/${id}`);
  } catch (error) {
    response = error.response;
  }
  return response.data;
}

export async function updateResource(body) {
  let response;
  try {
    response = await axiosInstance.post(`resources/update/${body.id}`, body);
  } catch (error) {
    response = error.response;
  }
  return response.data;
}
export async function getResourceById(id) {
  let response;
  try {
    response = await axiosInstance.get(`resources/${id}`);
  } catch (error) {
    response = error.response;
  }
  return response.data;
}
