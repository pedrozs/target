import { toast } from 'react-toastify';

import * as types from './actionTypes';
import targetApi from '../api/targetApi';
import history from '../utils/history';
import routes from '../constants/routesPaths';

const getTargetsSuccess = ({ targets }) => ({
  type: types.GET_TARGETS_SUCCESS,
  targets
});

const createTargetSuccess = ({ target }) => ({
  type: types.CREATE_TARGET_SUCCESS,
  target
});

export const getTargets = () => (dispatch) => {
  targetApi.getTargets()
    .then(targets => dispatch(getTargetsSuccess(targets)))
    .catch(() => toast.error('Could not retrieve targets'));
};

export const createTarget = target => (dispatch) => {
  history.push(routes.index);
  targetApi.createTarget(target)
    .then((target) => {
      dispatch(createTargetSuccess(target));
      toast.success('Target created successfully');
    })
    .catch(({ errors }) => {
      errors ?
        toast.error(errors.targetsLimit[0]) :
        toast.error('Netowrk unreachable');
    });
};
