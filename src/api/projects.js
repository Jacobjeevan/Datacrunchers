export default function fetchProjects() {
  return fetch(`${process.env.REACT_APP_API_URL}projects/`)
    .then((res) => res.json())
    .catch((err) => console.log(err));
}

// add <- takes in access token
// update <- takes in access token
// delete <- takes in access token
