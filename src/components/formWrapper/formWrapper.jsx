import React from "react";
import "./formWrapper.css";

const FormWrapper = ({ title, children, footer }) => {
  return (
    <div className="form-wrapper">
      <div className="form-box">
        <h2>{title}</h2>
        {children}
        {footer && <div className="form-footer">{footer}</div>}
      </div>
    </div>
  );
};

export default FormWrapper;
