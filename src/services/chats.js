/** Chats Service
 *
 * Interacts with the backend api
 *
 */

const BASE_ENDPOINT = 'http://5ed8eb5a.ngrok.io/api/v1';

class ChatsService {
	// todo accept thread ID
	async fetchThread() {
		const url = `${BASE_ENDPOINT}/user/conversations/thread`;

		try {
			const response = await fetch(url);

			if (!response.ok) {
				throw new Error(`Failed to get thread from endpoint`);
			}

			// Response was ok
			const thread = await response.json();
			return thread;
		} catch (error) {
			console.error(error);
		}
	}

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

			console.log(reply);

			return reply;
		} catch (error) {
			console.error(error);
		}
	}
}

export default new ChatsService();
