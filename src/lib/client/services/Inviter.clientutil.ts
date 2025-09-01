import type { ApiResponse } from '$lib/@types/Responses.types';
import { HttpService } from '../functions/HttpService';

const http = HttpService.getInstance();

export class Inviter {
	public static async sendUserInvite(groupId: string, email: string): Promise<ApiResponse> {
		if (!email || !groupId) {
			throw new Error('Missing required data!');
		}

		const data = {
			groupId,
			email
		};

		return await http.post<ApiResponse, typeof data>(
			`groups/${groupId}/invite_user`,
			data
		)
	}
}
