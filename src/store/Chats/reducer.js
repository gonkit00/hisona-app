import keys from 'lodash/keys';
import * as types from './actionTypes';
import Immutable from 'seamless-immutable';

const initialState = Immutable({
	chatsById: undefined,
	isFetching: false,
	error: undefined
});

export default function reduce(state = initialState, action = {}) {
	switch (action.type) {
		case types.CHATS_FETCHED:
		case types.CHATS_FETCHED_SUCCESS:
		case types.CHATS_FETCHED_FAILURE:
		case types.CHATS_NEW_CONVERSATION:
		case types.CHATS_NEW_CONVERSATION_SUCCESS:
			return state;
		default:
			return state;
	}
}

/** Selectors */

export const isFetching = state => {
	const fetchingStatus = state.chats.isFetching;
	return fetchingStatus;
};
