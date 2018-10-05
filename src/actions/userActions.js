import { SubmissionError } from 'redux-form/immutable';
import { sessionService } from 'redux-react-session';
import { toast } from 'react-toastify';

import sessionApi from '../api/sessionApi';
import history from '../utils/history';
import routes from '../constants/routesPaths';

export const signUp = user =>
  () =>
    sessionApi.signUp({ user }).then(({ user }) => {
      sessionService.saveUser(user);
    }).catch((err) => {
      throw new SubmissionError({
        _error: err.errors
      });
    });

export const editUser = user =>
  () =>
    sessionApi.updateUser(user)
      .then(({ user }) => {
        toast('Account information successfully updated!');
        history.push(routes.index);
        sessionService.saveUser(user);
      })
      .catch((err) => {
        throw new SubmissionError({
          _error: err.errors
        });
      });
