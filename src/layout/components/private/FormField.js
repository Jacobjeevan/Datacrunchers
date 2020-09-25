import React from "react";
import "../../../css/formfield.css";

export const FormField = React.forwardRef((props, ref) => (
  <div class="form-element">
    <label className="form-label">{props.label} </label>
    <p className="error-message">{props.errorMessage}</p>
    <input
      type={props.type}
      name={props.name}
      value={props.value}
      ref={ref}
      onChange={props.onChange}
      className={props.className + " form-field"}
    />
    <p className="form-element-desc">{props.text}</p>
  </div>
));
