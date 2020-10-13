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
  const res = await axiosInstance.post("careers/add", body);
  return res.data;
}

export async function deleteCareer(id) {
  const res = await axiosInstance.delete(`careers/delete/${id}`);
  return res.data;
}

export async function updateCareer(body) {
  const res = await axiosInstance.post(`careers/update/${body.id}`, body);
  return res.data;
}

export async function getCareerById(id) {
  const res = await axiosInstance.get(`careers/${id}`);
  return res.data;
}
