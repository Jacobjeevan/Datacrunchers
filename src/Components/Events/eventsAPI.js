import useSWR from "swr";
import { axiosInstance } from "../common/Axios";

export function useGetEvents() {
  const { data, error, mutate } = useSWR("eventData", () =>
    axiosInstance.get("events/").then((res) => res.data)
  );
  return {
    data,
    isLoading: !error && !data,
    error,
    mutate,
  };
}

export async function addEvent(body) {
  const res = await axiosInstance.post("events/add", body);
  return res.data;
}

export async function deleteEvent(id) {
  const res = await axiosInstance.delete(`events/delete/${id}`);
  return res.data;
}

export async function updateEvent(body) {
  const res = await axiosInstance.post(`events/update/${body.id}`, body);
  return res.data;
}

export async function getEventById(id) {
  const res = await axiosInstance.get(`events/${id}`);
  return res.data;
}
