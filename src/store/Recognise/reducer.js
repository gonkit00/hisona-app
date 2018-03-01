import keys from 'lodash/keys';
import * as types from './actionTypes';
import Immutable from 'seamless-immutable';

const initialState = Immutable({
	isLoading: false,
	error: undefined
});

export default function reduce(state = initialState, action = {}) {
	switch (action.type) {
		case types.RECOGNISE_CLASSIFY_IMAGE_REQUESTED:
			return state.merge({
				isLoading: true
			});
		case types.RECOGNISE_CLASSIFY_IMAGE_SUCCESS:
			return state.merge({
				isLoading: false
			});
		case types.RECOGNISE_CLASSIFY_IMAGE_FAILURE:
			return state.merge({
				error: action.error.message,
				isLoading: false
			});
		default:
			return state;
	}
}

/** Selectors */

export const isLoading = state => {
	const loadingStatus = state.chats.isLoading;
	return loadingStatus;
};
