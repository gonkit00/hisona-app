import keyBy from 'lodash/keyBy';
import * as types from './actionTypes';
import RecogniseService from '~/services/recognise';
import { Actions } from 'react-native-router-flux';

export const classifyImage = imageUri => async (dispatch, getState) => {
	try {
		dispatch({ type: types.RECOGNISE_CLASSIFY_IMAGE_REQUESTED });

		const classData = await RecogniseService.classifyImage(imageUri);
		const artefact = await RecogniseService.mapClassToArtefact(classData);

		if (!artefact) {
			throw new Error('Artefacts fetch request failed');
		}

		// Normalise the artefact
		const artefactById = keyByIds(artefact);

		dispatch({
			type: types.RECOGNISE_CLASSIFY_IMAGE_SUCCESS,
			artefactById
		});
    Actions.push('matchScreen', { artefact: artefact[0] });

	} catch (error) {
		dispatch({ type: types.RECOGNISE_CLASSIFY_IMAGE_FAILURE, error });
		Actions.reset('root');
	}
};

// Normalise utilities
const keyByIds = artefacts =>
	keyBy(artefacts, artefact => artefact.artefact_id);
