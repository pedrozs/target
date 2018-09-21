import React from 'react';
import { object, func, bool } from 'prop-types';
import { Field, reduxForm } from 'redux-form/immutable';
import { Link } from 'react-router-dom';
import Select from 'react-select';
import {
  injectIntl,
  intlShape,
  defineMessages,
  FormattedMessage
} from 'react-intl';

import routes from '../../constants/routesPaths';
import Loading from '../common/Loading';
import Input from '../common/Input';
import { validations, signUp } from '../../utils/constraints';
import menu from '../../img/menu.png';

const messages = defineMessages({
  name: { id: 'signup.name' },
  email: { id: 'login.form.email' },
  password: { id: 'login.form.password' },
  passConfirmation: { id: 'signup.form.passconfirmation' },
  gender: { id: 'signup.gender' }
});

const options = [
  { value: 'male', label: 'Male' },
  { value: 'female', label: 'Female' },
  { value: 'other', label: 'Other' }
];

const SignUpForm = ({ error, handleSubmit, submitting, intl }) => (
  <div className="signupForm">
    <div className="topLeft">
      <img src={menu} alt="menu" className="icon" />
    </div>
    <p className="targetTitle">
      <FormattedMessage id="signup.title" />
    </p>
    <form className="form" onSubmit={handleSubmit}>
      {error && <strong>{error.fullMessages[0]}</strong>}
      <div>
        <Field
          name="username"
          label={intl.formatMessage(messages.name)}
          component={Input}
          type="text"
          className="input"
        />
      </div>
      <div>
        <Field
          name="email"
          label={intl.formatMessage(messages.email)}
          component={Input}
          type="email"
          className="input"
        />
      </div>
      <div>
        <Field
          name="password"
          label={intl.formatMessage(messages.password)}
          component={Input}
          type="password"
          className="input"
          placeholder="MIN. 8 CHARACTERS LONG"
        />
      </div>
      <div>
        <Field
          name="password_confirmation"
          label={intl.formatMessage(messages.passConfirmation)}
          component={Input}
          type="password"
          className="input"
        />
      </div>
      <div className="gender">
        {intl.formatMessage(messages.gender)}
        <Field
          name="gender"
          component={Select}
          type="text"
          className="input"
          classNamePrefix="react-select"
          options={options}
          isSearchable="false"
          placeholder="SELECT YOUR GENDER"
        />
      </div>
      <button className="input button" type="submit">
        <FormattedMessage id="signup.title" />
      </button>
      <div className="separator" />
      <Link to={routes.login}>
        <FormattedMessage id="signup.signin" />
      </Link>
      <div className="loading" >
        {submitting && <Loading />}
      </div>
    </form>
  </div>
);

SignUpForm.propTypes = {
  handleSubmit: func.isRequired,
  submitting: bool.isRequired,
  intl: intlShape.isRequired,
  error: object,
};

export default reduxForm({
  form: 'signUp',
  validate: validations(signUp, { fullMessages: false })
})(injectIntl(SignUpForm));
