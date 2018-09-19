import React from 'react';
import { func, string, bool } from 'prop-types';
import { Field, reduxForm } from 'redux-form/immutable';
import {
  injectIntl,
  intlShape,
  defineMessages,
  FormattedMessage
} from 'react-intl';

import Loading from '../common/Loading';
import Input from '../common/Input';
import { validations, login } from '../../utils/constraints';
import smilies from '../../img/smilies.svg';

const messages = defineMessages({
  email: { id: 'login.form.email' },
  password: { id: 'login.form.password' }
});

export const LoginForm = ({ handleSubmit, error, submitting, intl }) => (
  <div  className='loginForm'>
    <div className='aboutContact'>
      <div className='cross'>✖</div>
      <div>
        <a href='#' className='about' > ABOUT</a><br />
        <a href='#' className='contact'> CONTACT</a>
      </div>
    </div>
    <img src={smilies} />
    <p className='targetTitle'>TARGET MVD</p>
    <p className='targetSlogan'>Find people near you & Connect</p>
    <p className='targetDescription'>Create a  target  wherever on the map, specify your interest: Travel, Dating, Music, etc and start conecting with others who share your interest.</p>
    <form className='loginFields' onSubmit={handleSubmit}>
      {error && <strong>{error}</strong>}
      <div>
        <Field
          name="email"
          label={intl.formatMessage(messages.email)}
          component={Input}
          type="email"
        />
      </div>
      <div>
        <Field
          name="password"
          label={intl.formatMessage(messages.password)}
          component={Input}
          type="password"
        />
      </div>
      <button className='loginBtn' type="submit">
        SIGN IN
      </button>
      {submitting && <Loading />}
    </form>
  </div>
);

LoginForm.propTypes = {
  handleSubmit: func.isRequired,
  intl: intlShape.isRequired,
  submitting: bool.isRequired,
  error: string
};

export default reduxForm({
  form: 'login',
  validate: validations(login, { fullMessages: false })
})(injectIntl(LoginForm));
