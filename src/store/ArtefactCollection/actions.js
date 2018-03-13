import * as types from './actionTypes';
import ArtefactService from '~/services/artefactCollection';

export const getArtefactCollection = () => async (dispatch) => {
  try {
    const artefactCollection = await ArtefactService.fetchArtefactCollection();

    if(!artefactCollection) {
      throw new Error ('Artefact collection fetch request failed!');
    }

    dispatch(
      {
        type: types.GET_ARTEFACT_COLLECTION,
        artefactCollection
      });
  } catch (e) {
    console.log(e);
  }
}
