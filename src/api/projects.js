import axios from "axios";
import useSWR from "swr";

export function useGetProjects() {
  const { data, error, mutate } = useSWR("projectData", () =>
    axios
      .get(`${process.env.REACT_APP_API_URL}projects/`)
      .then((res) => res.data)
  );
  return {
    data,
    isLoading: !error && !data,
    error,
    mutate,
  };
}

export async function addProject(body, token) {
  const res = await axios.post(
    `${process.env.REACT_APP_API_URL}projects/add`,
    body,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return res.data;
}

export async function deleteProject(id, token) {
  const res = await axios.delete(
    `${process.env.REACT_APP_API_URL}projects/delete/${id}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return res.data;
}

export async function updateProject(body, token) {
  const res = await axios.post(
    `${process.env.REACT_APP_API_URL}projects/update/${body.id}`,
    body,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return res.data;
}
export async function getProjectById(id) {
  const res = await axios.get(`${process.env.REACT_APP_API_URL}projects/${id}`);
  return res.data;
}
