import keyBy from 'lodash/keyBy';
import * as types from './actionTypes';
import ChatsService from '~/services/chats';
import { Actions } from 'react-native-router-flux';

export const getArtefacts = () => async (dispatch, getState) => {
	try {
		dispatch({ type: types.CHATS_ARTEFACTS_FETCHED });
		const artefacts = await ChatsService.fetchArtefacts();

		if (!artefacts) {
			throw new Error('Artefacts fetch request failed');
		}

		// Normalise the chats
		const artefactsById = keyByIds(artefacts);

		dispatch({
			type: types.CHATS_ARTEFACTS_FETCHED_SUCCESS,
			artefactsById
		});
	} catch (error) {
		dispatch({ type: types.CHATS_ARTEFACTS_FETCHED_FAILURE, error });
	}
};

export const getChats = () => async (dispatch, getState) => {
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
			chats
		});
	} catch (error) {
		dispatch({ type: types.CHATS_FETCHED_FAILURE, error });
	}
};

export const openThread = (threadId, artefactName) => dispatch => {
	dispatch({
		type: types.CHATS_THREAD_OPENED,
		threadId
	});

	Actions.chatScreen({ title: artefactName });
};

export const addMessage = message => ({
	type: types.CHATS_THREAD_NEW_MESSAGE,
	message
});

export const addReply = text => async (dispatch, getState) => {
	try {
		dispatch({ type: types.CHATS_THREAD_REPLY_FETCHED });

		// TODO: Pass current artefact ID
		const opts = {
			artefact_id: '2_es_pub_christophercolumbus',
			msgStr: text
		};

		const replyData = await ChatsService.fetchReply(opts);

		if (!replyData) {
			throw new Error('No reply data returned from the service');
		}

		dispatch({
			type: types.CHATS_THREAD_REPLY_FETCHED_SUCCESS,
			reply: replyData.reply
		});
	} catch (error) {
		dispatch({ type: types.CHATS_THREAD_REPLY_FETCHED_FAILURE, error });
	}
};

// Normalise utilities
const keyByIds = artefacts =>
	keyBy(artefacts, artefact => artefact.artefact_id);
