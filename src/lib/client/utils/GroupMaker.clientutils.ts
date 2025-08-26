import type { ApiResponse } from '$lib/@types/Responses.types';
import { Toaster } from '../components/toaster/Toaster';
import { HttpService } from '../functions/HttpService';

const http = HttpService.getInstance();

export const GroupMaker = {
	createGroupCall: async (data: { name: string; description: string }): Promise<ApiResponse> => {
		try {
			const response = await http.post<ApiResponse, typeof data>('/groups', data);
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
