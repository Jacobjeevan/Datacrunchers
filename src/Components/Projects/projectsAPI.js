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
  let response;
  try {
    response = await axiosInstance.post("projects/add", body);
  } catch (error) {
    response = error.response;
  }
  return response.data;
}

export async function deleteProject(id) {
  let response;
  try {
    response = await axiosInstance.delete(`projects/delete/${id}`);
  } catch (error) {
    response = error.response;
  }
  return response.data;
}

export async function updateProject(body) {
  let response;
  try {
    response = await axiosInstance.post(`projects/update/${body.id}`, body);
  } catch (error) {
    response = error.response;
  }
  return response.data;
}

export async function getProjectById(id) {
  let response;
  try {
    response = await axiosInstance.get(`projects/${id}`);
  } catch (error) {
    response = error.response;
  }
  return response.data;
}
