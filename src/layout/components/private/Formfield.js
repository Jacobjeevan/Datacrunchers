import React from "react";
import Form from "react-bootstrap/Form";

export default function Formfield(props) {
  return (
    <Form.Group controlId={props.control}>
      <Form.Label>{props.label}</Form.Label>
      <Form.Control {...props} />
      <Form.Text className="text-muted">{props.text}</Form.Text>
    </Form.Group>
  );
}
