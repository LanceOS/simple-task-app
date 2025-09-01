import type { CreateTaskPayload } from '$lib/@types/Groups.types';
import { HttpService } from '../functions/HttpService';
import type { ApiResponse } from '$lib/@types/Responses.types';

const http = HttpService.getInstance();

export class TaskClientService {
	public static async createTask(data: CreateTaskPayload): Promise<ApiResponse> {
		if (!data.groupId || !data.name || !data.description) {
			throw new Error('Missing info for creating new task!');
		}
		return await http.post<ApiResponse, typeof data>(`groups/${data.groupId}/create_task`, data);
	};

	public static async assignMemberToTask(memberId: string, taskId: string, groupId: string) {
		const data = {
			memberId,
			taskId,
			groupId
		};

		await http.post<ApiResponse, typeof data>(`groups/${groupId}/task/${taskId}/assign_user`, data);
	};

	public static async unassignMemberToTask(memberId: string, taskId: string, groupId: string) {
		if (!memberId || !taskId || !groupId) {
			throw new Error('Missing required data!');
		}

		const data = {
			memberId,
			taskId
		};

		return await http.delete<typeof data>(`groups/${groupId}/task/${taskId}/unassign_user`, data);
	};

	public static async deleteCurrentTask(taskId: string, groupId: string) {
		if(!taskId || !groupId) {
			throw new Error("Missing task id!");
		}

		const data = {
			groupId,
			taskId
		}

		return await http.delete<typeof data>(`groups/${groupId}/task/${taskId}/delete_task`, data)
	}
}
