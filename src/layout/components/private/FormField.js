import React from "react";

export const FormField = React.forwardRef((props, ref) => (
  <div class="form-element">
    <label className="form-label">{props.label} </label>
    <input
      type={props.type}
      name={props.name}
      value={props.value}
      ref={ref}
      onChange={props.onChange}
      className={props.className + " form-field"}
    />
    <p>{props.text}</p>
    <p>{props.errorMessage}</p>
  </div>
));
