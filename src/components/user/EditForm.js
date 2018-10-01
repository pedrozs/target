import React from 'react';
import { func, string, bool, object } from 'prop-types';
import { Field, reduxForm } from 'redux-form/immutable';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import {
  injectIntl,
  intlShape,
  defineMessages,
  FormattedMessage
} from 'react-intl';

import Routes from '../../constants/routesPaths';
import Loading from '../common/Loading';
import Input from '../common/Input';
import SelectBox from '../common/Select';
import { validations, edit } from '../../utils/constraints';
import smilies from '../../img/smilies.svg';
import close from '../../img/close.png';
import profilePic from '../../img/guy.svg';
import blueCircle from '../../img/blue-circle.svg';

const messages = defineMessages({
  name: { id: 'signup.name' },
  firstName: { id: 'edit.firstName' },
  lastName: { id: 'edit.lastName' },
  email: { id: 'login.form.email' },
  gender: { id: 'signup.gender' },
  genderSelect: { id: 'signup.genderSelect' },
  success: { id: 'edit.success' }
});

const options = [
  { value: 'male', label: 'Male' },
  { value: 'female', label: 'Female' },
  { value: 'other', label: 'Other' }
];

let EditForm = ({ initialValues: user, handleSubmit, error, submitting, intl }) => (
  <div className="side-menu menu">
    <div className="top-left">
      <Link to={Routes.index}>
        <img src={close} alt="back" className="icon" />
      </Link>
    </div>
    <p className="target-title">EDIT PROFILE</p>
    <div className="profile-pic" >
      <img src={blueCircle} alt="blue" />
      <img src={profilePic} alt="guy" />
    </div>
    {user.firstName}
    <form className="form" onSubmit={handleSubmit}>
      {error && <strong>{error}</strong>}
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
          name="firstName"
          label={intl.formatMessage(messages.firstName)}
          component={Input}
          type="text"
          className="input"
        />
      </div>
      <div>
        <Field
          name="lastName"
          label={intl.formatMessage(messages.lastName)}
          component={Input}
          type="text"
          className="input"
        />
      </div>
      <div className="gender">
        <Field
          name="gender"
          label={intl.formatMessage(messages.gender)}
          component={SelectBox}
          type="text"
          className="input"
          classNamePrefix="react-select"
          options={options}
          isSearchable="false"
          placeholder={intl.formatMessage(messages.genderSelect)}
        />
      </div>
      <button className="input button" type="submit">
        <FormattedMessage id="edit.submit" />
      </button>
      <div className="loading" >
        {submitting && <Loading />}
      </div>
      <div className="spacer" />
      <img className="bottom-smilies" src={smilies} alt="smilies" />
    </form>
  </div>
);

EditForm.propTypes = {
  handleSubmit: func.isRequired,
  intl: intlShape.isRequired,
  submitting: bool.isRequired,
  error: string,
  initialValues: object.isRequired,
};

EditForm = reduxForm({
  form: 'login',
  validate: validations(edit, { fullMessages: false })
})(injectIntl(EditForm));

export default EditForm = connect(state => ({
  initialValues: state.getIn(['session', 'user']).toJS(),
}))(EditForm);
