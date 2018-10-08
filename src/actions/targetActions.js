import { toast } from 'react-toastify';

import * as types from './actionTypes';
import targetApi from '../api/targetApi';

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
  targetApi.createTarget(target)
    .then(target => dispatch(createTargetSuccess(target)))
    .catch(() => toast.error('Target could not be created'));
};
