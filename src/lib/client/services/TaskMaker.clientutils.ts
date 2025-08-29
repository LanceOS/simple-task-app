import { Toaster } from '../components/toaster/Toaster';
import { goto } from '$app/navigation';
import type { CreateTaskPayload } from '$lib/@types/Groups.types';
import { HttpService } from '../functions/HttpService';
import type { ApiResponse } from '$lib/@types/Responses.types';

const http = HttpService.getInstance();

export const TaskMaker = {
	createTask: async (data: CreateTaskPayload) => {
		try {
			if (!data.groupId || !data.name || !data.description) {
				Toaster.ejectToast({
					message: 'Missing info for creating new task!',
					type: 'error'
				});
				return;
			}

			const response = await http.post<ApiResponse, typeof data>(
				`groups/${data.groupId}/create_task`,
				data
			);

			Toaster.ejectToast({
				message: 'Created Task!',
				type: 'success'
			});
			goto(`/groups/${data.groupId}/task/${response}`);
			return response;
		} catch (error: any) {
			Toaster.ejectToast({
				message: 'Failed to create new task!',
				type: 'error'
			});
		}
	}
};
