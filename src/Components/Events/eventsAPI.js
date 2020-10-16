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
  let response;
  try {
    response = await axiosInstance.post("events/add", body);
  } catch (error) {
    response = error.response;
  }
  return response.data;
}

export async function deleteEvent(id) {
  let response;
  try {
    response = await axiosInstance.delete(`events/delete/${id}`);
  } catch (error) {
    response = error.response;
  }
  return response.data;
}

export async function updateEvent(body) {
  let response;
  try {
    response = await axiosInstance.post(`events/update/${body.id}`, body);
  } catch (error) {
    response = error.response;
  }
  return response.data;
}

export async function getEventById(id) {
  let response;
  try {
    response = await axiosInstance.get(`events/${id}`);
  } catch (error) {
    response = error.response;
  }
  return response.data;
}
