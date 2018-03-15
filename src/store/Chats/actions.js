import keyBy from 'lodash/keyBy';
import { Actions } from 'react-native-router-flux';

import * as types from './actionTypes';
import ChatsService from '~/services/chats';

export const getArtefacts = () => async (dispatch) => {
  try {
    dispatch({ type: types.CHATS_ARTEFACTS_FETCHED });
    const artefacts = await ChatsService.fetchArtefacts();

    if (!artefacts) {
      throw new Error('Artefacts fetch request failed');
    }

    // Normalise the artefacts
    const artefactsById = keyByIds(artefacts);

    dispatch({
      type: types.CHATS_ARTEFACTS_FETCHED_SUCCESS,
      artefactsById,
    });
  } catch (error) {
    dispatch({ type: types.CHATS_ARTEFACTS_FETCHED_FAILURE, error });
  }
};

export const getChats = () => async (dispatch) => {
  try {
    dispatch({ type: types.CHATS_FETCHED });
    const chats = await ChatsService.fetchChats();

    if (!chats) {
      throw new Error('Chats fetch request failed');
    }

    // Normalise the chats
    // const chatsById = keyByIds(chats, conversation_id);
    dispatch({
      type: types.CHATS_FETCHED_SUCCESS,
      chats,
    });
  } catch (error) {
    dispatch({ type: types.CHATS_FETCHED_FAILURE, error });
  }
};

export const openMapThread = (artefactId, artefactName) => async (dispatch) => {
  try {
    const threadId = await ChatsService.fetchThread(artefactId);
    if (!threadId) throw new Error('no thread id ');
    threadId = threadId.message;

    dispatch({ type: types.CHATS_ARTEFACTS_FETCHED });
    const artefacts = await ChatsService.fetchArtefacts();
    if (!artefacts) {
      throw new Error('Artefacts fetch request failed');
    }
    // Normalise the artefacts
    const artefactsById = keyByIds(artefacts);
    dispatch({
      type: types.CHATS_ARTEFACTS_FETCHED_SUCCESS,
      artefactsById,
    });

    const chats = await ChatsService.fetchChats();
    if (!chats) {
      throw new Error('Chats fetch request failed');
    }
    dispatch({
      type: types.CHATS_FETCHED_SUCCESS,
      chats,
    });

    dispatch({
      type: types.CHATS_THREAD_OPENED,
      threadId,
    });
  } catch (error) {
    dispatch({ type: types.CHATS_FETCHED_FAILURE, error });
    console.log(error);
  }

  Actions.chatScreen({ title: artefactName });
};

export const openThread = (threadId, artefactId, artefactName) => (dispatch) => {
  dispatch({
    type: types.CHATS_THREAD_OPENED,
    threadId,
  });

  Actions.chatScreen({ title: artefactName });
};

export const addMessage = message => ({
  type: types.CHATS_THREAD_NEW_MESSAGE,
  message,
});

export const addReply = (artefactId, text) => async (dispatch) => {
  try {
    dispatch({ type: types.CHATS_TYPING_INDICATOR });
    dispatch({ type: types.CHATS_THREAD_REPLY_FETCHED });

    const opts = {
      artefact_id: artefactId,
      text,
    };

    const replyData = await ChatsService.fetchReply(opts);

    if (!replyData) {
      throw new Error('No reply data returned from the service');
    }

    setTimeout(() => {
      dispatch({
        type: types.CHATS_THREAD_REPLY_FETCHED_SUCCESS,
        reply: replyData.reply,
      });
    }, 3000);
  } catch (error) {
    dispatch({ type: types.CHATS_THREAD_REPLY_FETCHED_FAILURE, error });
  }
};

// Normalise utilities
const keyByIds = artefacts => keyBy(artefacts, artefact => artefact.artefact_id);
