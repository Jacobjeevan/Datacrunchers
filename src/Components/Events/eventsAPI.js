import axios from "axios";
import useSWR from "swr";

export function useGetEvents() {
  const { data, error, mutate } = useSWR("eventData", () =>
    axios.get(`${process.env.REACT_APP_API_URL}events/`).then((res) => res.data)
  );
  return {
    data,
    isLoading: !error && !data,
    error,
    mutate,
  };
}

export async function addEvent(body, token) {
  const res = await axios.post(
    `${process.env.REACT_APP_API_URL}events/add`,
    body
  );
  return res.data;
}

export async function deleteEvent(id, token) {
  const res = await axios.delete(
    `${process.env.REACT_APP_API_URL}events/delete/${id}`
  );
  return res.data;
}

export async function updateEvent(body, token) {
  const res = await axios.post(
    `${process.env.REACT_APP_API_URL}events/update/${body.id}`,
    body
  );
  return res.data;
}

export async function getEventById(id) {
  const res = await axios.get(`${process.env.REACT_APP_API_URL}events/${id}`);
  return res.data;
}
