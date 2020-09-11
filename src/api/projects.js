import axios from "axios";
import { useQuery, useMutation, queryCache } from "react-query";

export function useGetProjects() {
  return useQuery("projectData", () =>
    axios
      .get(`${process.env.REACT_APP_API_URL}projects/`)
      .then((res) => res.data)
  );
}

export function useAddProject() {
  return useMutation(
    (body) => {
      axios
        .post(`${process.env.REACT_APP_API_URL}projects/add`, body)
        .then((res) => res.data);
    },
    {
      onSuccess: () => {
        queryCache.invalidateQueries("projectData");
      },
    }
  );
}

export function useDeleteProject() {
  return useMutation(
    (id) => {
      axios
        .delete(`${process.env.REACT_APP_API_URL}projects/delete/${id}`)
        .then((res) => res.data);
    },
    {
      onSuccess: () => {
        queryCache.invalidateQueries("projectData");
      },
    }
  );
}
// add <- takes in access token
// update <- takes in access token
// delete <- takes in access token
