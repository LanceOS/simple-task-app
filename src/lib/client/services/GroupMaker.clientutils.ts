import { goto } from '$app/navigation';
import type { ApiResponse } from '$lib/@types/Responses.types';
import { Toaster } from '../components/toaster/Toaster';
import { HttpService } from '../functions/HttpService';

const http = HttpService.getInstance();

export const GroupMaker = {
	createGroupCall: async (data: { name: string; description: string }): Promise<ApiResponse> => {
		try {
			const response = await http.post<ApiResponse, typeof data>('groups', data);
			Toaster.ejectToast({
				message: 'Created new task group!',
				type: 'success'
			});
			goto(`/groups/${response.message}`)
			return response
		} catch (error: any) {
			Toaster.ejectToast({
				message: 'Failed to create new group!',
				type: 'error'
			});

			return error.message;
		}
	},

	joinGroup: async (code: string): Promise<ApiResponse> => {
		try {
			const response = await http.post<ApiResponse, typeof code>('groups/join_group', code);
			Toaster.ejectToast({
				message: "Successfully joined group!",
				type: 'success'
			});

			goto(`/groups/${response.message}`)
			return response;
		} catch (error: any) {
			Toaster.ejectToast({
				message: error.message || "Failed to join group!",
				type: 'error'
			});

			return error.message;
		}
	}
};
