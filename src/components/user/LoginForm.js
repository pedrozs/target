import React from 'react';
import { func, string, bool } from 'prop-types';
import { Field, reduxForm } from 'redux-form/immutable';
import { Link } from 'react-router-dom';
import FacebookLogin from 'react-facebook-login';
import {
  injectIntl,
  intlShape,
  defineMessages,
  FormattedMessage
} from 'react-intl';

import { FB_ID } from '../../constants/constants';
import routes from '../../constants/routesPaths';
import { Loading, Input } from '../common';
import { validations, login } from '../../utils/constraints';
import smilies from '../../img/smilies.svg';
import close from '../../img/close.png';

const messages = defineMessages({
  email: { id: 'login.form.email' },
  password: { id: 'login.form.password' },
  facebook: { id: 'login.facebook' }
});

export const LoginForm = ({ onFbLogin, handleSubmit, error, submitting, intl }) => (
  <div className="login-form">
    <div className="top-left">
      <img src={close} alt="close" className="icon" />
      <div>
        <a href="#" className="about" > ABOUT</a><br />
        <a href="#" className="contact"> CONTACT</a>
      </div>
    </div>
    <img alt="smilies" src={smilies} />
    <p className="target-title">TARGET MVD</p>
    <p className="target-slogan">Find people near you & Connect</p>
    <p className="target-description">Create a  target  wherever on the map, specify your interest: Travel, Dating, Music, etc and start conecting with others who share your interest.</p>
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
          name="password"
          label={intl.formatMessage(messages.password)}
          component={Input}
          type="password"
          className="input"
        />
      </div>
      <button className="input button" type="submit">
        <FormattedMessage id="signup.signin" />
      </button>
      <a className="forgot-password">
        <FormattedMessage id="login.forgot_password" />
      </a>
      <FacebookLogin
        appId={FB_ID}
        fields="name,email,picture"
        textButton={intl.formatMessage(messages.facebook)}
        callback={onFbLogin}
        cssClass="connect-facebook"
        autoLoad={false}
      />
      <div className="separator" />
      <Link to={routes.signUp}>
        <FormattedMessage id="signup.title" />
      </Link>
      <div className="loading" >
        {submitting && <Loading />}
      </div>
    </form>
  </div>
);

LoginForm.propTypes = {
  handleSubmit: func.isRequired,
  intl: intlShape.isRequired,
  submitting: bool.isRequired,
  error: string,
  onFbLogin: func.isRequired
};

export default reduxForm({
  form: 'login',
  validate: validations(login, { fullMessages: false })
})(injectIntl(LoginForm));
