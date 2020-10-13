import useSWR from "swr";
import { axiosInstance } from "../common/Axios";

export function useGetProjects() {
  const { data, error, mutate } = useSWR("projectData", () =>
    axiosInstance.get("projects/").then((res) => res.data)
  );
  return {
    data,
    isLoading: !error && !data,
    error,
    mutate,
  };
}

export async function addProject(body) {
  const res = await axiosInstance.post("projects/add", body);
  return res.data;
}

export async function deleteProject(id) {
  const res = await axiosInstance.delete(`projects/delete/${id}`);
  return res.data;
}

export async function updateProject(body) {
  const res = await axiosInstance.post(`projects/update/${body.id}`, body);
  return res.data;
}
export async function getProjectById(id) {
  const res = await axiosInstance.get(`projects/${id}`);
  return res.data;
}
