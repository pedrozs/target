import React from 'react';
import { string, bool, array, func } from 'prop-types';
import { Field, reduxForm } from 'redux-form/immutable';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import {
  injectIntl,
  intlShape,
  defineMessages,
  FormattedMessage
} from 'react-intl';

import { updateTopics, } from '../../actions/sessionActions';
import Routes from '../../constants/routesPaths';
import Loading from '../common/Loading';
import Input from '../common/Input';
import SelectBox from '../common/Select';
import { validations, target } from '../../utils/constraints';
import smilies from '../../img/smilies.svg';
import close from '../../img/close.png';
import targetImg from '../../img/target.svg';

const messages = defineMessages({
  name: { id: 'signup.name' },
  firstName: { id: 'edit.firstName' },
  lastName: { id: 'edit.lastName' },
  email: { id: 'login.form.email' },
  topic: { id: 'target.topic' },
  genderSelect: { id: 'signup.genderSelect' },
  title: { id: 'target.title' },
  area: { id: 'target.area' },
  success: { id: 'edit.success' }
});

let TargetForm = ({ error, handleSubmit, submitting, intl, topics, updateTopics, eraseTarget }) => {
  let topicList;
  const topicToJSON = topic => ({
    value: topic.topic.id,
    label: topic.topic.label
  });
  if (topics && topics.length != 0) {
    topicList = topics.map(topicToJSON);
  }
  updateTopics();
  return (
    <div className="left-panel">
      <div className="top-left">
        <Link onClick={eraseTarget} to={Routes.index}>
          <img src={close} alt="back" className="icon" />
        </Link>
      </div>
      <div className="top-pic" >
        <img src={targetImg} alt="target" />
      </div>
      <div className="target-description center"><FormattedMessage id="target.welcome" /></div>
      <form className="form" onSubmit={handleSubmit}>
        {error && <strong>{error}</strong>}
        <div>
          <Field
            className="input"
            component={Input}
            label={intl.formatMessage(messages.area)}
            name="radius"
            type="text"
          />
        </div>
        <div>
          <Field
            className="input"
            component={Input}
            label={intl.formatMessage(messages.title)}
            name="title"
            type="text"
          />
        </div>
        <div className="gender">
          <Field
            className="input"
            classNamePrefix="react-select"
            component={SelectBox}
            label={intl.formatMessage(messages.topic)}
            name="topic"
            options={topicList}
            type="text"
          />
        </div>
        <button className="input button" type="submit">
          <FormattedMessage id="target.submit" />
        </button>
        <div className="loading" >
          {submitting && <Loading />}
        </div>
        <div className="spacer" />
        <img className="bottom-smilies" src={smilies} alt="smilies" />
      </form>
    </div>
  );
};

TargetForm.propTypes = {
  handleSubmit: func.isRequired,
  intl: intlShape.isRequired,
  submitting: bool.isRequired,
  error: string,
  topics: array,
  updateTopics: func,
  eraseTarget: func,
};

TargetForm = reduxForm({
  form: 'target',
  validate: validations(target, { fullMessages: false })
})(injectIntl(TargetForm));

const mapDispatchToProps = dispatch => ({
  updateTopics: () => dispatch(updateTopics),
});

export default TargetForm = connect(null, mapDispatchToProps)(TargetForm);
