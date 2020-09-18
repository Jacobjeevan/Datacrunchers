import axios from "axios";
import useSWR from "swr";

export function useGetCareers() {
  const { data, error, mutate } = useSWR("careerData", () =>
    axios
      .get(`${process.env.REACT_APP_API_URL}careers/`)
      .then((res) => res.data)
  );
  return {
    data,
    isLoading: !error && !data,
    error,
    mutate,
  };
}

export async function addCareer(body, token) {
  const res = await axios.post(
    `${process.env.REACT_APP_API_URL}careers/add`,
    body,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return res.data;
}

export async function deleteCareer(id, token) {
  const res = await axios.delete(
    `${process.env.REACT_APP_API_URL}careers/delete/${id}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return res.data;
}

export async function updateCareer(body, token) {
  const res = await axios.post(
    `${process.env.REACT_APP_API_URL}careers/update/${body.id}`,
    body,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return res.data;
}
