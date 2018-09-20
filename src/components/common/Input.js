import React from 'react';
import { string, object } from 'prop-types';

const Input = ({
  input,
  label,
  type,
  placeholder,
  className
}) => (
  <div className={className}>
    {label && <label>{label}</label>}
    <div>
      <input {...input} {...{ placeholder, type }} />
    </div>
  </div>
);

Input.propTypes = {
  input: object.isRequired,
  label: string,
  type: string.isRequired,
  placeholder: string,
  className: string,
};

export default Input;
