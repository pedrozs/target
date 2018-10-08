import { toast } from 'react-toastify';

import * as types from './actionTypes';
import topicApi from '../api/topicApi';

const getTopicsSucess = ({ topics }) => ({
  type: types.GET_TOPICS_SUCCESS,
  topics
});

export const getTopics = () => (dispatch) => {
  topicApi.getTopics()
    .then(topics => dispatch(getTopicsSucess(topics)))
    .catch(() => toast.error('Could not retrieve topics'));
};
