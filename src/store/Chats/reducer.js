import keys from 'lodash/keys';
import * as types from './actionTypes';
import Immutable from 'seamless-immutable';

const initialState = Immutable({
	artefactsById: {},
	allChats: [],
	currentArtefact: undefined,
	currentThread: undefined,
	isLoading: false,
	error: undefined
});

export default function reduce(state = initialState, action = {}) {
	switch (action.type) {
		case types.CHATS_ARTEFACTS_FETCHED:
		case types.CHATS_FETCHED:
			return state.merge({
				isLoading: true
			});
		case types.CHATS_ARTEFACTS_FETCHED_SUCCESS:
			return state.merge({
				artefactsById: action.artefactsById,
				isLoading: false
			});
		case types.CHATS_FETCHED_SUCCESS:
			return state.merge({
				allChats: action.chats,
				isLoading: false
			});
		case types.CHATS_THREAD_OPENED:
			const current = getCurrentChat(state, action.threadId);
			return state.merge({
				currentArtefact: current,
				currentThread: current[0].thread
			});
		// case types.CHATS_THREAD_READ:
		// 	const chat = state.allChats.filter(
		// 		chat => chat.artefact_id === action.artefactId
		// 	)[0];
		// 	return state.merge({
		// 		allChats: [Immutable.update(chat, 'read', markRead), ...state.allChats]
		// 	});
		// 	return state;
		case types.CHATS_THREAD_NEW_MESSAGE:
			return state.merge({
				currentThread: [...state.currentThread, action.message]
			});
		case types.CHATS_TYPING_INDICATOR:
			return state.merge({
				currentThread: [
					...state.currentThread,
					{
						content_type: 'typing_indicator',
						direction: 'left',
						duration: '3000'
					}
				],
				isLoading: false
			});
		case types.CHATS_THREAD_REPLY_FETCHED_SUCCESS:
			return state.merge({
				currentThread: state.currentThread.slice(0, -1).concat(action.reply),
				isLoading: false
			});
		case types.CHATS_ARTEFACTS_FETCHED_FAILURE:
		case types.CHATS_FETCHED_FAILURE:
		case types.CHATS_THREAD_FETCHED_FAILURE:
			return state.merge({
				error: action.error.message,
				isLoading: false
			});
		default:
			return state;
	}
}

/** Selectors */

const getCurrentChat = (state, conversationId) => {
	const current = state.allChats.filter(
		chat => chat.conversation_id === conversationId
	);
	return current;
};

export const isLoading = state => {
	const loadingStatus = state.chats.isLoading;
	return loadingStatus;
};

export const getArtefactsById = state => {
	const artefactsById = state.chats.artefactsById;
	return artefactsById;
};

export const getChats = state => {
	const chats = state.chats.allChats;
	return chats;
};

export const getCurrentArtefact = state => {
	const artefact = state.chats.currentArtefact;
	return artefact;
};

export const getCurrentThread = state => {
	const currentThread = state.chats.currentThread;
	return currentThread;
};
