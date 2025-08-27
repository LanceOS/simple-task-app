import type { ApiResponse } from '$lib/@types/Responses.types';
import { Toaster } from '../components/toaster/Toaster';
import { HttpService } from '../functions/HttpService';

const http = HttpService.getInstance();

export const Inviter = {
	sendUserInvite: async (groupId: string, email: string): Promise<ApiResponse> => {
		if (!email) {
			Toaster.ejectToast({
				message: 'Missing required data!',
				type: 'error'
			});
		}

		const data = {
			groupId,
			email
		};

		try {
			const response = await http.post<ApiResponse, typeof data>(
				`groups/${groupId}/invite_user`,
				data
			);

			Toaster.ejectToast({
				message: 'Invite sent!',
				type: 'success'
			});

			return response;
		} catch (error: any) {
			Toaster.ejectToast({
				message: 'Failed to invite user!',
				type: 'error'
			});

			return {
				ok: false,
				message: error.message || 'Failed to create new group!'
			};
		}
	}
};
