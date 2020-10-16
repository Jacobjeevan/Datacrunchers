import useSWR from "swr";
import { axiosInstance } from "../common/Axios";

export function useGetCareers() {
  const { data, error, mutate } = useSWR("careerData", () =>
    axiosInstance.get("careers/").then((res) => res.data)
  );
  return {
    data,
    isLoading: !error && !data,
    error,
    mutate,
  };
}

export async function addCareer(body) {
  let response;
  try {
    response = await axiosInstance.post("careers/add", body);
  } catch (error) {
    response = error.response;
  }
  return response.data;
}

export async function deleteCareer(id) {
  let response;
  try {
    response = await axiosInstance.delete(`careers/delete/${id}`);
  } catch (error) {
    response = error.response;
  }
  return response.data;
}

export async function updateCareer(body) {
  let response;
  try {
    response = await axiosInstance.post(`careers/update/${body.id}`, body);
  } catch (error) {
    response = error.response;
  }
  return response.data;
}

export async function getCareerById(id) {
  let response;
  try {
    response = await axiosInstance.get(`careers/${id}`);
  } catch (error) {
    response = error.response;
  }
  return response.data;
}
