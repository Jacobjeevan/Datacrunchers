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
  const res = await axiosInstance.post("officers/add", body);
  return res.data;
}

export async function deleteOfficer(id) {
  const res = await axiosInstance.delete(`officers/delete/${id}`);
  return res.data;
}

export async function updateOfficer(id, body) {
  const res = await axiosInstance.post(`officers/update/${id}`, body);
  return res.data;
}
