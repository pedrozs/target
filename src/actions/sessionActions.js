import { SubmissionError } from 'redux-form/immutable';
import { sessionService } from 'redux-react-session';

import sessionApi from '../api/sessionApi';
import * as types from './actionTypes';
import history from '../utils/history';
import routes from '../constants/routesPaths';

export const hideToast = () => ({
  type: types.TOASTED,
});

const getTopicsSucess = ({ topics }) => ({
  type: types.GET_TOPICS_SUCCESS,
  topics
});

const loading = () => ({
  type: types.LOADING
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
  () =>
    sessionApi.updateUser(user)
      .then(({ user }) => {
        history.push(routes.index);
        sessionService.saveUser(user);
      })
      .catch((err) => {
        throw new SubmissionError({
          _error: err.errors
        });
      });

export const getTopics = () => (dispatch) => {
  dispatch(loading());
  sessionApi.getTopics().then((topics) => {
    dispatch(getTopicsSucess(topics));
  });
};
