/** Recognise Service
 *
 * Sends photos to be classified
 *
 */

const BASE_ENDPOINT = 'http://6f4e0a98.ngrok.io/api/v1';

const RecogniseService = {
	async classifyImage(uri) {
		const url = `${BASE_ENDPOINT}/classification/watson/classify`;

		try {
			const data = new FormData();

			data.append('photo', {
				uri,
				name: 'selfie.jpg',
				type: 'image/jpg'
			});

			// Create the config object for the POST
			const opts = {
				method: 'POST',
				headers: {
					Accept: 'application/json',
					'Content-Type': 'multipart/form-data;'
				},
				body: data
			};

			const response = await fetch(url, opts);

			if (!response.ok) {
				throw new Error(`Failed to get a response from the '${url}' endpoint`);
			}

			// Response was ok
			const artefact = await response.json();
			return artefact;
		} catch (error) {
			console.error(error);
		}
	}
};

export default RecogniseService;
