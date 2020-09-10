import React from "react";
import FormField from "./Formfield";
import "../../../css/projectsform.css";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useMutation, queryCache } from "react-query";
import { addProject } from "../../../api/projects";
/* import { useAuth0 } from "@auth0/auth0-react";
 */
import { useInput } from "./formInput-hook";

export default function Projectsform(props) {
  // const { isAuthenticated, getAccessTokenSilently } = useAuth0();
  const [mutate] = useMutation(
    (body) => {
      return addProject(body);
    },
    {
      onSuccess: () => {
        queryCache.invalidateQueries("projectData");
      },
    }
  );
  const { value: title, bind: bindTitle, reset: resetTitle } = useInput("");
  const { value: description, bind: bindDesc, reset: resetDesc } = useInput("");
  const { value: authors, bind: bindAuthors, reset: resetAuthors } = useInput(
    ""
  );
  const { value: github, bind: bindGithub, reset: resetGithub } = useInput("");

  const handleSubmit = (evt) => {
    evt.preventDefault();
    const body = { title, description, authors, github };
    mutate(body);
    resetTitle();
    resetDesc();
    resetAuthors();
    resetGithub();
  };

  return (
    <div className="formContent">
      <span className="closeBtn" onClick={props.toggle}></span>
      <Form onSubmit={handleSubmit}>
        <FormField
          control="ProjectTitle"
          label="Title"
          type="text"
          text="Enter the name of the Project"
          {...bindTitle}
        />

        <FormField
          control="ProjectDesc"
          label="Description"
          type="text"
          text="Enter brief information about the Project"
          {...bindDesc}
        />

        <FormField
          control="ProjectAuthor"
          label="Authors"
          type="text"
          text="Enter Name of Authors"
          {...bindAuthors}
        />

        <FormField
          control="ProjectLink"
          label="Github"
          type="text"
          text="Enter Link to the Project"
          {...bindGithub}
        />

        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </div>
  );
}
