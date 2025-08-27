import { Toaster } from '../components/toaster/Toaster';
import { HttpService } from '../functions/HttpService';

const http = HttpService.getInstance();

export const GroupMaker = {
	createGroupCall: async (data: { name: string; description: string }): Promise<Response> => {
		try {
			const response = await http.post<Response, typeof data>('groups', data);
			Toaster.ejectToast({
				message: 'Created new task group!',
				type: 'success'
			});
			return response;
		} catch (error: any) {
			Toaster.ejectToast({
				message: 'Failed to create new group!',
				type: 'error'
			});

			return {
				ok: false,
				message: error.message || 'Failed to create new group!'
			};
		}
	}
};
