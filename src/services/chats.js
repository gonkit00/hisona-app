/** Chats Service
 *
 * Interacts with the backend api
 *
 */

const BASE_ENDPOINT = 'http://localhost:8081/api/v1/user';

class ChatsService {
	async fetchThread() {
		const url = `${BASE_ENDPOINT}/conversations/thread`;

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
}

export default new ChatsService();
