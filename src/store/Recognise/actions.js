import keyBy from 'lodash/keyBy';
import * as types from './actionTypes';
import RecogniseService from '~/services/recognise';
import { Actions } from 'react-native-router-flux';

export const classifyImage = imageUri => async (dispatch, getState) => {
  try {
    dispatch({ type: types.RECOGNISE_CLASSIFY_IMAGE_REQUESTED });

    const classData = await RecogniseService.classifyImage(imageUri);

    if (!classData.images[0].classifiers.length) {
      throw new Error('There is no artefact that matches the class label');
    }

    const artefact = await RecogniseService.mapClassToArtefact(classData);

    // Normalise the artefact
    const artefactById = keyByIds(artefact);

    dispatch({
      type: types.RECOGNISE_CLASSIFY_IMAGE_SUCCESS,
      artefactId: artefactById,
    });

    Actions.push('matchScreen', { artefact: artefact[0] });
  } catch (error) {
    dispatch({ type: types.RECOGNISE_CLASSIFY_IMAGE_FAILURE, error });
    Actions.reset('root');
  }
};

// Normalise utilities
const keyByIds = artefacts => keyBy(artefacts, artefact => artefact.artefact_id);
