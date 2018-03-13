import Immutable from 'seamless-immutable';
import * as types from './actionTypes';

const initialState = Immutable({
  artefactCollection: []
});

export default function reduce(state = initialState, action = {}) {
  switch (action.type) {
    case types.GET_ARTEFACT_COLLECTION:
      return state.merge(
        {artefactCollection: action.artefactCollection });
    default:
      return state;
  };
};

export const getArtefactCollection = (state) => {
  const artefactCollection = state.artefact.artefactCollection;
  return artefactCollection;
};
