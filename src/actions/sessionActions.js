import { SubmissionError } from 'redux-form/immutable';
import { sessionService } from 'redux-react-session';

import sessionApi from '../api/sessionApi';
import * as types from './actionTypes';

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

const newLoc = coords => ({
  type: types.UPDATE_LOC,
  coords
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
        dispatch(editSucess());
        dispatch(toast('CHANGES SAVED'));
        sessionService.saveUser(user);
      })
      .catch((err) => {
        throw new SubmissionError({
          _error: err.errors
        });
      });

export const updateLoc = coords => dispatch => dispatch(newLoc(coords));

export const toasted = dispatch => dispatch(burnt());
