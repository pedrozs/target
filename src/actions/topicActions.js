import { toast } from 'react-toastify';

import topicApi from '../api/topicApi';
import * as types from './actionTypes';

const getTopicsSucess = ({ topics }) => ({
  type: types.GET_TOPICS_SUCCESS,
  topics
});

const loading = () => ({
  type: types.LOADING
});

export const getTopics = () => (dispatch) => {
  dispatch(loading());
  topicApi.getTopics().then((topics) => {
    dispatch(getTopicsSucess(topics));
  }).catch(() => toast.error('Topics could not be retrieved'));
};
