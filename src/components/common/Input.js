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
  meta: object,
  className: string,
};

export default Input;
