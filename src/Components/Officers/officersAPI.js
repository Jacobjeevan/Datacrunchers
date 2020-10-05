import axios from "axios";
import useSWR from "swr";

export function useGetOfficers() {
  const { data, error, mutate } = useSWR("officerData", () =>
    axios
      .get(`${process.env.REACT_APP_API_URL}officers/`)
      .then((res) => res.data)
  );
  return {
    data,
    isLoading: !error && !data,
    error,
    mutate,
  };
}

export async function addOfficer(body) {
  const res = await axios.post(
    `${process.env.REACT_APP_API_URL}officers/add`,
    body
  );
  return res.data;
}

export async function deleteOfficer(id) {
  const res = await axios.delete(
    `${process.env.REACT_APP_API_URL}officers/delete/${id}`
  );
  return res.data;
}

export async function updateOfficer(body) {
  const res = await axios.post(
    `${process.env.REACT_APP_API_URL}officers/update/${body.id}`,
    body
  );
  return res.data;
}
