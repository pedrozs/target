import toast from 'react-toastify';

import conversationApi from '../api/conversationApi';
import { GET_CONVERSATION_SUCCESS } from './actionTypes';

const getConversationsSuccess = ({ matches }) => ({
  type: GET_CONVERSATION_SUCCESS,
  conversations: matches
});

export const getConversations = () => (dispatch) => {
  conversationApi.getConversations()
    .then((conversations) => {
      dispatch(getConversationsSuccess(conversations));
    })
    .catch(() => toast.error('Conversations could not be retrieved'));
};
