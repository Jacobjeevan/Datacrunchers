import axios from "axios";
import useSWR from "swr";

export function useGetResources() {
  const { data, error, mutate } = useSWR("resourceData", () =>
    axios
      .get(`${process.env.REACT_APP_API_URL}resources/`)
      .then((res) => res.data)
  );
  return {
    data,
    isLoading: !error && !data,
    error,
    mutate,
  };
}

export async function addResource(body, token) {
  const res = await axios.post(
    `${process.env.REACT_APP_API_URL}resources/add`,
    body,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return res.data;
}

export async function deleteResource(id, token) {
  const res = await axios.delete(
    `${process.env.REACT_APP_API_URL}resources/delete/${id}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return res.data;
}

export async function updateResource(body, token) {
  const res = await axios.post(
    `${process.env.REACT_APP_API_URL}resources/update/${body.id}`,
    body,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return res.data;
}
export async function getResourceById(id) {
  const res = await axios.get(
    `${process.env.REACT_APP_API_URL}resources/${id}`
  );
  return res.data;
}
