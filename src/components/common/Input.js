import React from 'react';
import { string, object } from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { parseInputErrors } from '../../utils/helpers';

const Input = ({
  input,
  label,
  type,
  placeholder,
  className,
  meta: { touched, error }
}) => (
  <div className={className}>
    {label && <label>{label}</label>}
    <div className="error">
      {touched && error &&
        <FormattedMessage
          id={parseInputErrors(error)}
          defaultMessage={parseInputErrors(error)}
        />
      }
    </div>
    <div>
      <input {...input} {...{ placeholder, type }} className={(touched && error) ? 'red-box' : ''} />
    </div>
  </div>
);

Input.propTypes = {
  input: object.isRequired,
  label: string,
  type: string.isRequired,
  placeholder: string,
  className: string,
  meta: object,
};

export default Input;
