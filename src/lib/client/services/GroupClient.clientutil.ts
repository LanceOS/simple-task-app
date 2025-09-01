import { goto } from '$app/navigation';
import type { ApiResponse } from '$lib/@types/Responses.types';
import { Toaster } from '../components/toaster/Toaster';
import { HttpService } from '../functions/HttpService';

const http = HttpService.getInstance();

export class GroupClient {
	public static async createGroup(data: {
		name: string;
		description: string;
	}): Promise<ApiResponse> {
		try {
			const response = await http.post<ApiResponse, typeof data>('groups/create_group', data);
			Toaster.ejectToast({
				message: 'Created new task group!',
				type: 'success'
			});
			goto(`/groups/${response.message}`);
			return response;
		} catch (error: any) {
			Toaster.ejectToast({
				message: 'Failed to create new group!',
				type: 'error'
			});

			return error.message;
		}
	}

	public static async joinGroup(code: string): Promise<ApiResponse> {
		try {
			const response = await http.post<ApiResponse, typeof code>('groups/join_group', code);
			Toaster.ejectToast({
				message: 'Successfully joined group!',
				type: 'success'
			});

			goto(`/groups/${response.message}`);
			return response;
		} catch (error: any) {
			Toaster.ejectToast({
				message: error.message || 'Failed to join group!',
				type: 'error'
			});

			return error.message;
		}
	}

	public static async deleteGroup(groupIds: string[]): Promise<void> {
		if (groupIds.length === 0) {
			throw new Error('Must have group IDs to delete!');
		}
		await http.delete<typeof groupIds>('groups/delete_group', groupIds);
	}

	public static async leaveGroups(groupIds: string[]): Promise<void> {
		if (!groupIds || groupIds.length === 0) {
			throw new Error('Must provide group IDs to leave!');
		}
		await http.delete<typeof groupIds>('groups/leave_group', groupIds);
	}
}
