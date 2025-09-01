import type { ApiResponse } from '$lib/@types/Responses.types';
import { authClient } from '$lib/auth-client';
import { http } from '../functions/HttpService';

export class GroupClient {
	public static async createGroup(data: {
		name: string;
		description: string;
	}): Promise<ApiResponse> {
		const session = await authClient.getSession();
		if (!session.data?.user) {
			throw new Error('User must be signed in to create group!');
		}
		return await http.post<ApiResponse, typeof data>('groups/create_group', data);
	}

	public static async joinGroup(code: string): Promise<ApiResponse> {
		return await http.post<ApiResponse, typeof code>('groups/join_group', code);
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
