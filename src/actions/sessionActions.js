import { SubmissionError } from 'redux-form/immutable';
import { sessionService } from 'redux-react-session';

import sessionApi from '../api/sessionApi';
import * as types from './actionTypes';
import history from '../utils/history';
import routes from '../constants/routesPaths';

const editSucess = () => ({
  type: types.EDIT_SUCCESS
});

const toast = message => ({
  type: types.TOAST,
  message
});

const burnt = () => ({
  type: types.TOASTED,
});

const topicUpdater = topics => ({
  type: types.UPDATE_TOPICS,
  topics
});

export const login = user =>
  () =>
    sessionApi.login({ user }).then(({ data: user }) => {
      sessionService.saveUser(user);
    }).catch((err) => {
      throw new SubmissionError({
        _error: err.errors
      });
    });

export const loginFacebook = user =>
  () => {
    sessionApi.loginFacebook({ accessToken: user }).then(({ data: user }) => {
      sessionService.saveUser(user);
    }).catch((err) => {
      throw new SubmissionError({
        _error: err.errors
      });
    });
  };

export const logout = () =>
  () =>
    sessionApi.logout().then(() => {
      sessionService.deleteSession();
      sessionService.deleteUser();
    }).catch((err) => {
      throw (err);
    });

export const editUser = user =>
  dispatch =>
    sessionApi.updateUser(user)
      .then(({ user }) => {
        history.push(routes.index);
        dispatch(editSucess());
        dispatch(toast('CHANGES SAVED'));
        sessionService.saveUser(user);
      })
      .catch((err) => {
        throw new SubmissionError({
          _error: err.errors
        });
      });

export const finishTarget = target => (dispatch) => {
  sessionApi.newTarget(target).then(() => {
    dispatch(toast('TARGET SAVED'));
  }).catch(() => {
    dispatch(toast('TARGET NOT SAVED'));
  });
};

export const toasted = dispatch => dispatch(burnt());

export const updateTopics = () => (dispatch) => {
  sessionApi.getTopics().then((topics) => {
    dispatch(topicUpdater(topics));
  });
};
