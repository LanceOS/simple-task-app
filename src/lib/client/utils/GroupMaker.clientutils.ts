import { FetchHandler } from '$lib/client/functions/FetchHandler.helper';
import { Toaster } from '../components/toaster/Toaster';

export const GroupMaker = {
	createGroupCall: async (data: { name: string; description: string }) => {
		try {
			const response = await FetchHandler.fetch('/groups', 'post', data);

			if (response.ok) {
				Toaster.ejectToast({
					message: 'Created new task group!',
					type: 'success'
				});
				return response;
			} else {
				const errorData = await response.json();
				Toaster.ejectToast({
					message: errorData.message || 'Failed to create new group!',
					type: 'error'
				});
			}
		} catch (error: any) {
			Toaster.ejectToast({
				message: 'Failed to create new group!',
				type: 'error'
			});
		}
	}
};
