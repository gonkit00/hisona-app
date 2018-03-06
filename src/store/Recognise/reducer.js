import Immutable from 'seamless-immutable';
import * as types from './actionTypes';

const initialState = Immutable({
  lastClassifiedArtefact: undefined,
  isLoading: false,
  error: undefined,
});

export default function reduce(state = initialState, action = {}) {
  switch (action.type) {
    case types.RECOGNISE_CLASSIFY_IMAGE_REQUESTED:
      return state.merge({
        isLoading: true,
      });
    case types.RECOGNISE_CLASSIFY_IMAGE_SUCCESS:
      return state.merge({
        lastClassifiedArtefact: action.artefactId,
        isLoading: false,
      });
    case types.RECOGNISE_CLASSIFY_IMAGE_FAILURE:
      return state.merge({
        error: action.error.message,
        isLoading: false,
      });
    default:
      return state;
  }
}

/** Selectors */

export const isLoading = (state) => {
  const loadingStatus = state.recognise.isLoading;
  return loadingStatus;
};
