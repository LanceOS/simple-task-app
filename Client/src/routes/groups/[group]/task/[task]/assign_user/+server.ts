import { HttpError, ResponseHandler } from '$lib/server/helpers/ResponseHandler.helper';
import { GetUser } from '$lib/server/helpers/UserCheck.helper.js';
import { journalService } from '$lib/server/services/Journalist.serverutil.js';
import { taskService } from '$lib/server/services/Tasker.serverutil.js';

export const POST = async ({ request }) => {
	try {
		const body = await request.json();

		const user = GetUser(request);

		if (!user) {
			return ResponseHandler.json('User must be signed in to appoint tasks!', 401)
		}

		const newAssigneeEntryId = await taskService.assignUserToTask(body.taskId, body.memberId);

		const findNewAssignee = await taskService.getAssigneeByEntryId(newAssigneeEntryId, body.taskId);

		if(!findNewAssignee) {
            throw new HttpError("Assignee was assigned but system failed to get their data!", 500);
		}

		await journalService.writeJournal({
			action: 'Assigned Member',
			description: 'A group member has been assigned to a task.',
			metadata: {
				parentGroupId: body.groupId,
				taskId: body.taskId,
				assignedMember: body.memberId
			}
		});

		return ResponseHandler.json(findNewAssignee, 200);
	} catch (error: any) {
		if (error instanceof HttpError) {
			return ResponseHandler.json( error.message, error.status);
		}
		return ResponseHandler.json(error.message, 500);
	}
};
