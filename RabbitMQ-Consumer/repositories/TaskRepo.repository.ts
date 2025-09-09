import { and, eq } from 'drizzle-orm';
import { DrizzleDB } from '../database/Drizzle';
import { task } from '../database/schemas/task.schema';
import { taskAssignee } from '../database/schemas/task_assignee.schema';


export class TaskRepository {
	private db = DrizzleDB;


	async unassignUserFromTask(taskId: string, memberId: string): Promise<void> {
		await this.db
			.delete(taskAssignee)
			.where(and(eq(taskAssignee.parentTaskId, taskId), eq(taskAssignee.assigneeId, memberId)));
	}

	async deleteTask(taskId: string) {
		await this.db.delete(task).where(eq(task.id, taskId));
	}
}
