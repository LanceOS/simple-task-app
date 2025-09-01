import { error } from 'console';
import type { PageServerLoad } from './$types';
import { GetUser } from '$lib/server/helpers/UserCheck.helper';
import { redirect } from '@sveltejs/kit';
import { taskService } from '$lib/server/services/Tasker.serverutil';
import { groupService } from '$lib/server/services/Group.serverutil';

export const load: PageServerLoad = async ({ params, request }) => {
	const user = await GetUser(request);

	if (!user) {
		throw redirect(308, '/signin');
	}
	try {
		const taskId = params.task;
		const groupId = params.group;

		const task = await taskService.getTask(taskId);
		const assignees = await taskService.getAssignees(taskId);
		const groupMembers = await groupService.getAllMembers(groupId);
		const isUserAdmin = await groupService.isMemberAdmin(user.id!, groupId);

		const assigneeIds = new Set(assignees.map((a) => a.assigneeId));
		const filteredMemberArray = groupMembers.filter((member) => !assigneeIds.has(member.userId));

		if(task === undefined) {
			return error(500, "Failed to find task")
		}

		return {
			task,
			assignees,
			groupMembers: filteredMemberArray,
			isUserAdmin
		};
	} catch (err: any) {
		return error(500, err.message);
	}
};
