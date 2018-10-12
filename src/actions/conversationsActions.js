import toast from 'react-toastify';

import conversationApi from '../api/conversationApi';
import { GET_CONVERSATION_SUCCESS, GET_MESSAGES_SUCCESS } from './actionTypes';

const getConversationsSuccess = ({ matches }) => ({
  type: GET_CONVERSATION_SUCCESS,
  conversations: matches
});

const getMessagesSucess = messages => ({
  type: GET_MESSAGES_SUCCESS,
  messages
});

export const getConversations = () => (dispatch) => {
  conversationApi.getConversations()
    .then((conversations) => {
      dispatch(getConversationsSuccess(conversations));
    })
    .catch(() => toast.error('Conversations could not be retrieved'));
};

export const getMessages = id => (dispatch) => {
  conversationApi.getMessages(id)
    .then(messages => dispatch(getMessagesSucess(messages)))
}
