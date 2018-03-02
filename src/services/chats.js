/** Chats Service
 *
 * Interacts with the backend api
 *
 */

import config from '~/config/api';

const BASE_ENDPOINT = config.base_endpoint;

const ChatsService = {
	async fetchArtefacts() {
		const url = `${BASE_ENDPOINT}/user/artefacts`;

		try {
      const response = await fetch(url);

      console.log(response);

			if (!response.ok) {
				throw new Error(`Failed to get a response from the '${url}' endpoint`);
			}

			// Response was ok
      const artefacts = await response.json();
      return artefacts;

		} catch (error) {
			console.error(error);
		}
	},

	async fetchChats() {
		const url = `${BASE_ENDPOINT}/user/conversations`;

		try {
			const response = await fetch(url);

			if (!response.ok) {
				throw new Error(`Failed to get a response from the '${url}' endpoint`);
			}

			// Response was ok
			const chats = await response.json();
			return chats;
		} catch (error) {
			console.error(error);
		}
	},

	async fetchReply(opts) {
		const url = `${BASE_ENDPOINT}/classification/intent/classify`;

		try {
			const response = await fetch(url, {
				method: 'POST',
				body: JSON.stringify(opts)
			});

			if (!response.ok) {
				throw new Error(`Failed to get a response from the '${url}' endpoint`);
			}

			// Response was ok
			const reply = await response.json();

			return reply;
		} catch (error) {
			console.error(error);
		}
	}
};

export default ChatsService;
