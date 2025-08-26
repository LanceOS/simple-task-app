import { error } from 'console';
import type { PageServerLoad } from './$types';
import { GetUser } from '$lib/server/helpers/UserCheck.helper';
import { redirect } from '@sveltejs/kit';
import { TaskManager } from '$lib/server/services/Tasker.serverutil';
import { GroupManager } from '$lib/server/services/Group.serverutil';

export const load: PageServerLoad = async ({ params, request }) => {
	const user = await GetUser(request);

	if (!user) {
		throw redirect(308, '/signin');
	}
	try {
		const taskId = params.task;
		const groupId = params.group;

		const task = await TaskManager.getSingleTask(taskId);
		const assignees = await TaskManager.getAssignees(taskId);
		const groupMembers = await GroupManager.getGroupMembers(groupId);
		const isUserAdmin = await GroupManager.isCurrentUserAdmin(user.id!, groupId)

		return {
			task,
			assignees,
			groupMembers,
			isUserAdmin
		};
	} catch (err: any) {
		return error(500, err.message);
	}
};
