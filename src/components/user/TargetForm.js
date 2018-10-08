import React from 'react';
import { string, bool, func, array } from 'prop-types';
import { Field, reduxForm } from 'redux-form/immutable';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import {
  injectIntl,
  intlShape,
  defineMessages,
  FormattedMessage
} from 'react-intl';

import { getTopics } from '../../actions/topicActions';
import { createTarget } from '../../actions/targetActions';
import Routes from '../../constants/routesPaths';
import { Loading, Input, SelectBox } from '../common';
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

const topicsToJSON = topic => ({
  value: topic.topic.id,
  id: topic.topic.label
});

let TargetForm = ({ error, handleSubmit, submitting, intl, topics, setTargetRadius }) => {
  const topicList = topics.map(topicsToJSON);
  return (
    <div className="left-panel">
      <div className="top-left">
        <Link to={Routes.index}>
          <img src={close} alt="back" className="icon" />
        </Link>
      </div>
      <div className="column">
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
              type="number"
              onChange={setTargetRadius}
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
          <div className="select-box">
            {(topicList.length == 0) ?
              <Loading /> :
              <Field
                className="input"
                classNamePrefix="react-select"
                component={SelectBox}
                label={intl.formatMessage(messages.topic)}
                name="topicId"
                options={topicList}
                type="text"
              />}
          </div>
          <button className="input button" type="submit">
            <FormattedMessage id="target.submit" />
          </button>
          <div className="loading" >
            {submitting && <Loading />}
          </div>
        </form>
      </div>
      <img className="bottom-smilies" src={smilies} alt="smilies" />
    </div>
  );
};

TargetForm.propTypes = {
  error: string,
  handleSubmit: func.isRequired,
  intl: intlShape.isRequired,
  setTargetRadius: func,
  submitting: bool.isRequired,
  topics: array,
};

TargetForm = reduxForm({
  form: 'target',
  validate: validations(target, { fullMessages: false })
})(injectIntl(TargetForm));

const mapStore = store => ({
  topics: store.getIn(['topics']).toJS()
});

const mapDispatch = dispatch => ({
  onSubmit: (target) => {
    dispatch(createTarget(target.toJS()));
  },
  getTopics: () => dispatch(getTopics()),
});

export default TargetForm = connect(mapStore, mapDispatch)(TargetForm);
