/** Actions */

import keyBy from 'lodash/keyBy';
import * as types from './actionTypes';
import chatsService from '~/services/chats';

export const getThread = () => async (dispatch, getState) => {
	try {
		dispatch({ type: types.CHATS_THREAD_FETCHED });
		const thread = await chatsService.fetchThread();

		if (!thread) {
			throw new Error('Thread fetch request failed');
		}

		// Normalise the events
		// const eventsById = keyByIds(events);
		dispatch({
			type: types.CHATS_THREAD_FETCHED_SUCCESS,
			thread
		});
	} catch (error) {
		dispatch({ type: types.CHATS_THREAD_FETCHED_FAILURE, error });
	}
};

export const addMessage = message => ({
	type: types.CHATS_THREAD_NEW_MESSAGE,
	message
});

export const addReply = text => async (dispatch, getState) => {
	try {
		dispatch({ type: types.CHATS_THREAD_REPLY_FETCHED });

		const opts = {
			artefact_id: '2_es_pub_christophercolumbus',
			msgStr: text
		};

		const replyData = await chatsService.fetchReply(opts);

		if (!replyData) {
			throw new Error('No reply data returned from the service');
		}

		const replyMessage = {
			direction: 'left',
			text: replyData.reply[0].body
		};

		dispatch({
			type: types.CHATS_THREAD_REPLY_FETCHED_SUCCESS,
	    replyMessage
		});
	} catch (error) {
		dispatch({ type: types.CHATS_THREAD_REPLY_FETCHED_FAILURE, error });
	}
};
