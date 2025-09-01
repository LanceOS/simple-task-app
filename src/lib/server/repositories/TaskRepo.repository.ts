import { DrizzleDB } from '$lib/Drizzle';
import { and, eq } from 'drizzle-orm';
import { task, type ITask } from '../schemas/task.schema';
import { taskAssignee } from '../schemas/task_assignee.schema';
import type { AssignedMembers, CreateTaskPayload } from '$lib/@types/Groups.types';

export class TaskRepository {
	private db = DrizzleDB;

	async create(data: CreateTaskPayload): Promise<string> {
		const [newTask] = await this.db
			.insert(task)
			.values({
				taskName: data.name,
				description: data.description,
				parentGroupId: data.groupId
			})
			.returning({ id: task.id });

		return newTask.id;
	}

	async findTasks(groupId: string): Promise<ITask[]> {
		return await this.db.query.task.findMany({
			where: eq(task.parentGroupId, groupId)
		});
	}

	async findSingleTask(taskId: string): Promise<ITask | undefined> {
		return await this.db.query.task.findFirst({
			where: eq(task.id, taskId)
		});
	}

	async findAssignees(
		taskId: string
	): Promise<AssignedMembers[]> {
		return await this.db.query.taskAssignee.findMany({
			where: eq(taskAssignee.parentTaskId, taskId),
			with: {
				assignee: {
					columns: {
						id: true,
						name: true,
						image: true
					}
				}
			}
		});
	}

	async assignUserToTask(taskId: string, memberId: string): Promise<string> {
		const [newAssignee] = await this.db
			.insert(taskAssignee)
			.values({
				parentTaskId: taskId,
				assigneeId: memberId
			})
			.returning();
		return newAssignee.id;
	}

	async unassignUserFromTask(taskId: string, memberId: string): Promise<void> {
		await this.db.delete(taskAssignee).where(and(eq(taskAssignee.parentTaskId, taskId), eq(taskAssignee.assigneeId, memberId)))
	}

	async deleteTask(taskId: string) {
		await this.db.delete(task).where(eq(task.id, taskId))
	}
}
