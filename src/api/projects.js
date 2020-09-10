import axios from "axios";

export function fetchProjects() {
  return axios
    .get(`${process.env.REACT_APP_API_URL}projects/`)
    .then((res) => res.data)
    .catch((err) => console.log(err));
}

export function addProject(body) {
  return axios
    .post(`${process.env.REACT_APP_API_URL}projects/add`, body)
    .then((res) => console.log(res.data))
    .catch((err) => console.log(err));
}

// add <- takes in access token
// update <- takes in access token
// delete <- takes in access token
