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

export async function addOfficer(body, token) {
  const res = await axios.post(
    `${process.env.REACT_APP_API_URL}officers/add`,
    body,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return res.data;
}

export async function deleteOfficer(id, token) {
  const res = await axios.delete(
    `${process.env.REACT_APP_API_URL}officers/delete/${id}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return res.data;
}

export async function updateOfficer(body, token) {
  const res = await axios.post(
    `${process.env.REACT_APP_API_URL}officers/update/${body.id}`,
    body,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return res.data;
}
