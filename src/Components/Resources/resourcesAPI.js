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
  const res = await axiosInstance.post("resources/add", body);
  return res.data;
}

export async function deleteResource(id) {
  const res = await axiosInstance.delete(`resources/delete/${id}`);
  return res.data;
}

export async function updateResource(body) {
  const res = await axiosInstance.post(`resources/update/${body.id}`, body);
  return res.data;
}
export async function getResourceById(id) {
  const res = await axiosInstance.get(`resources/${id}`);
  return res.data;
}
