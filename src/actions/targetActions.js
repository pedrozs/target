import { toast } from 'react-toastify';

import * as types from './actionTypes';
import targetApi from '../api/targetApi';
import history from '../utils/history';
import routes from '../constants/routesPaths';

const getTargetsSuccess = ({ targets }) => ({
  type: types.GET_TARGETS_SUCCESS,
  targets
});

const deleteTargetSuccess = index => ({
  type: types.DELETE_TARGET_SUCCESS,
  index
});

export const getTargets = () => (dispatch) => {
  targetApi.getTargets()
    .then(targets => dispatch(getTargetsSuccess(targets)))
    .catch(() => toast.error('Could not retrieve targets'));
};

export const createTarget = target => (dispatch) => {
  history.push(routes.index);
  targetApi.createTarget(target)
    .then(() => {
      dispatch(getTargets());
      toast.success('Target created successfully');
    })
    .catch(({ errors }) => {
      errors ?
        toast.error(errors.targetsLimit[0]) :
        toast.error('Netowrk unreachable');
    });
};

export const deleteTarget = ({ id, index }) => (dispatch) => {
  targetApi.deleteTarget(id)
    .then(() => {
      dispatch(deleteTargetSuccess(index));
      toast.success('Target deleted succesfully');
    }).catch();
};
