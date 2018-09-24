import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Select from 'react-select';
import { FormattedMessage } from 'react-intl';
import { parseInputErrors } from '../../utils/helpers';

class SelectBox extends Component {
  constructor(props, context) {
    super(props, context);

    this.onChange = this.onChange.bind(this);
    this.onBlur = this.onBlur.bind(this);
  }

  onChange({ value }) {
    const { onChange } = this.props.input;
    onChange && onChange(value);
  }

  onBlur() {
    const { onBlur, value } = this.props.input;
    onBlur && onBlur(value);
  }

  render() {
    const { className, classNamePrefix, input, label, placeholder, options, meta: { touched, error } } = this.props;

    return (
      <div>
        {label && <label className="input-label" htmlFor={input.name}>{label}</label>}
        <div>
          <div className='error'>
            {touched && error &&
              <FormattedMessage
              id={parseInputErrors(error)}
              defaultMessage={parseInputErrors(error)}
              />
            }
          </div>
          <Select
            name={input.name}
            options={options}
            className={(touched && error) ? className + ' red-box' : className}
            classNamePrefix={classNamePrefix}
            placeholder={placeholder || false}
            onBlur={this.onBlur}
            onChange={this.onChange}
            clearable={false}
            searchable={false}
          />
        </div>
      </div>
    );
  }
}

const { string, object, array } = PropTypes;

SelectBox.propTypes = {
  input: object.isRequired,
  label: string,
  placeholder: string,
  options: array,
  meta: object
};

export default SelectBox;
