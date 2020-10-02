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

export async function addCareer(body) {
  const res = await axios.post(
    `${process.env.REACT_APP_API_URL}careers/add`,
    body
  );
  return res.data;
}

export async function deleteCareer(id) {
  const res = await axios.delete(
    `${process.env.REACT_APP_API_URL}careers/delete/${id}`
  );
  return res.data;
}

export async function updateCareer(body) {
  const res = await axios.post(
    `${process.env.REACT_APP_API_URL}careers/update/${body.id}`,
    body
  );
  return res.data;
}

export async function getCareerById(id) {
  const res = await axios.get(`${process.env.REACT_APP_API_URL}careers/${id}`);
  return res.data;
}
