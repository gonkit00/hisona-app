import keys from 'lodash/keys';
import * as types from './actionTypes';
import Immutable from 'seamless-immutable';

const initialState = Immutable({
	chatsById: undefined,
	currentArtefactId: undefined,
	currentThread: [],
	isLoading: false,
	error: undefined
});

export default function reduce(state = initialState, action = {}) {
	switch (action.type) {
		case types.CHATS_FETCHED:
			return state.merge({
				isLoading: true
			});
		case types.CHATS_FETCHED_SUCCESS:
		case types.CHATS_FETCHED_FAILURE:
			return state.merge({
				error: action.error.message,
				isLoading: false
			});
		case types.CHATS_THREAD_FETCHED:
			return state.merge({
				isLoading: true
			});
		case types.CHATS_THREAD_FETCHED_SUCCESS:
			return state.merge({
				currentThread: action.thread,
				isLoading: false
			});
		case types.CHATS_THREAD_FETCHED_FAILURE:
			return state.merge({
				error: action.error.message,
				isLoading: false
			});
		case types.CHATS_THREAD_NEW_MESSAGE:
			return state.merge({
				currentThread: [...state.currentThread, action.message],
				isLoading: false
			});
		case types.CHATS_THREAD_REPLY_FETCHED_SUCCESS:
			return state.merge({
				currentThread: [...state.currentThread, action.replyMessage],
				isLoading: false
			});
		case types.CHATS_THREAD_FETCHED_FAILURE:
			return state.merge({
				error: action.error.message,
				isLoading: false
			});
		case types.CHATS_NEW_CONVERSATION:
		case types.CHATS_NEW_CONVERSATION_SUCCESS:
			return state;
		default:
			return state;
	}
}

/** Selectors */

export const isLoading = state => {
	const loadingStatus = state.chats.isLoading;
	return loadingStatus;
};

export const getCurrentThread = state => {
	const currentThread = state.chats.currentThread;
	return currentThread;
};
