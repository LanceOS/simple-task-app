import type { ApiResponse } from '$lib/@types/Responses.types';
import { HttpError } from '$lib/server/helpers/ResponseHandler.helper';
import { http } from '../helpers/HttpService';
import { validateSessionOrRedirect } from '../helpers/ValidateClientAuth.helper';

export class GroupClient {
	public static async createGroup(data: {
		name: string;
		description: string;
	}): Promise<ApiResponse> {
		await validateSessionOrRedirect()
		return await http.post<ApiResponse, typeof data>('groups/create_group', data);
	}

	public static async joinGroup(code: string): Promise<ApiResponse> {
		await validateSessionOrRedirect()
		return await http.post<ApiResponse, typeof code>('groups/join_group', code);
	}

	public static async deleteGroup(groupIds: string[]): Promise<void> {
		if (groupIds.length === 0) {
			throw new HttpError('Must have group IDs to delete!', 400);
		}
		await validateSessionOrRedirect()
		await http.delete<typeof groupIds>('groups/delete_group', groupIds);
	}

	public static async leaveGroups(groupIds: string[]): Promise<void> {
		if (!groupIds || groupIds.length === 0) {
			throw new HttpError('Must provide group IDs to leave!', 400);
		}
		await validateSessionOrRedirect()
		await http.delete<typeof groupIds>('groups/leave_group', groupIds);
	}
}
