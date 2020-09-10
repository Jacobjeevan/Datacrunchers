import axios from "axios";

export async function fetchProjects() {
  try {
    const res = await axios.get(`${process.env.REACT_APP_API_URL}projects/`);
    return res.data;
  } catch (err) {
    return console.log(err);
  }
}

export async function addProject(body) {
  try {
    const res = await axios.post(
      `${process.env.REACT_APP_API_URL}projects/add`,
      body
    );
    return console.log(res.data);
  } catch (err) {
    return console.log(err);
  }
}

// add <- takes in access token
// update <- takes in access token
// delete <- takes in access token
