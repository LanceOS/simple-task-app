import { PUBLIC_LOKI_PUSH } from '$env/static/public';
import { Journalist } from '../services/Journalist.serverutil';

export const Loki = {
	createLog: async (job: string, level: string, message: string) => {
		const nowInNano = (Date.now() * 1e6).toString();
		const payload = {
			streams: [
				{
					stream: {
						job: job,
						level: level
					},
					values: [[nowInNano, message]]
				}
			]
		};

		try {
			const response = await fetch(PUBLIC_LOKI_PUSH, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(payload)
			});

			if (!response.ok) {
				const errorBody = await response.text();
				throw new Error(
					`Failed to send log to Loki. Status: ${response.status}, Body: ${errorBody}`
				);
			}
		} catch (error: any) {
			await Journalist.write({
				action: 'Log',
				description: 'Failed to create log with Loki',
				metadata: {
					message: error.message
				}
			});
		}
	}
};
