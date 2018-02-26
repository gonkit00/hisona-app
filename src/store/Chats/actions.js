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
			type: types.CHATS_THREAD_FETCHED_SUCCESS, thread
		});
	} catch (error) {
		dispatch({ type: types.CHATS_THREAD_FETCHED_FAILURE, error });
	}
};
