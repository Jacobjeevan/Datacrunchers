import React from "react";
import FormField from "./Formfield";
import "../../../css/projectsform.css";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

export default function Projectsform(props) {
  return (
    <div className="formContent">
      <span className="closeBtn" onClick={props.toggle}></span>
      <Form>
        <FormField
          control="ProjectName"
          label="Name"
          type="text"
          placeholder="Enter Name"
          text="Enter the name of the Project"
        />

        <FormField
          control="ProjectDesc"
          label="Description"
          type="text"
          placeholder="About the Project"
          text="Enter brief information about the Project"
        />

        <FormField
          control="ProjectAuthor"
          label="Authors"
          type="text"
          placeholder="Authors"
          text="Enter Name of Authors"
        />

        <FormField
          control="ProjectLink"
          label="Github"
          type="text"
          placeholder="Github Link"
          text="Enter Link to the Project"
        />

        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </div>
  );
}
