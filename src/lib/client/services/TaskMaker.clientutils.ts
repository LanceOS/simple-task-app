import { Toaster } from '../components/toaster/Toaster';
import { goto } from '$app/navigation';
import type { CreateTaskPayload } from '$lib/@types/Groups.types';
import { HttpService } from '../functions/HttpService';
import type { ApiResponse } from '$lib/@types/Responses.types';

const http = HttpService.getInstance();

export const TaskMaker = {
	createTask: async (data: CreateTaskPayload) => {
		if (!data.groupId || !data.name || !data.description) {
			Toaster.ejectToast({
				message: 'Missing info for creating new task!',
				type: 'error'
			});
			return;
		}
		try {
			const response = await http.post<ApiResponse, typeof data>(
				`groups/${data.groupId}/create_task`,
				data
			);

			Toaster.ejectToast({
				message: 'Created Task!',
				type: 'success'
			});
			goto(`/groups/${data.groupId}/task/${response.message}`);
			return response;
		} catch (error: any) {
			Toaster.ejectToast({
				message: error.message || 'Failed to create new task!',
				type: 'error'
			});
		}
	},

	assignMemberToTask: async (memberId: string, taskId: string, groupId: string) => {
		const data = {
			memberId,
			taskId
		}

		try {
			await http.post<ApiResponse, typeof data>(
				`groups/${groupId}/task/${taskId}/assign_user`,
				data
			);
			Toaster.ejectToast({
				message: 'Created Task!',
				type: 'success'
			});
		} catch (error: any) {
			Toaster.ejectToast({
				message: error.message || 'Failed to assign member to task!',
				type: 'error'
			});
		}
	},

	unassignMemberToTask: async (memberId: string, taskId: string, groupId: string) => {
		const data = {
			memberId,
			taskId
		}

		try {
			await http.delete<typeof data>(
				`groups/${groupId}/task/${taskId}/unassign_user`,
				data
			);
			Toaster.ejectToast({
				message: 'Created Task!',
				type: 'success'
			});
		} catch (error: any) {
			Toaster.ejectToast({
				message: error.message || 'Failed to assign member to task!',
				type: 'error'
			});
		}
	}};
