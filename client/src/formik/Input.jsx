import React from "react";
import { ErrorMessage, Field} from 'formik';
import './style.css'
function Input({name, label, className='defaultInput',  ...rest}) {
  return (
    <div className={className}>
      <label htmlFor={name}>{label}</label>
      <Field id={name} name={name} {...rest} placeholder={label}/>
      <ErrorMessage component="div" className="error-message" name={name} />
    </div>
  );
}

export default Input;
