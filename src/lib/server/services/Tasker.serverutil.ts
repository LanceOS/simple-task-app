import type { AssignedMembers, CreateTaskPayload, EssentialUserData } from '$lib/@types/Groups.types';
import { TaskRepository } from '../repositories/Task.repository';
import type { ITask } from '../schemas/task.schema';

export class TaskService {
	private static instance: TaskService;

	constructor(private taskRepository: TaskRepository) {}

	public static getInstance(taskRepository: TaskRepository) {
		if (!TaskService.instance) {
			TaskService.instance = new TaskService(taskRepository);
		}
		return TaskService.instance;
	}

	async createTask(data: CreateTaskPayload): Promise<string> {
		return await this.taskRepository.create(data);
	}

	async getAllTasks(groupId: string): Promise<ITask[]> {
		return await this.taskRepository.findTasks(groupId);
	}

	async getTask(taskId: string): Promise<ITask | undefined> {
		return await this.taskRepository.findSingleTask(taskId);
	}

	async getAssignees(
		taskId: string
	): Promise<AssignedMembers[]> {
		return await this.taskRepository.findAssignees(taskId);
	}

	async assignUserToTask(taskId: string, memberId: string): Promise<string> {
		return await this.taskRepository.assignUserToTask(taskId, memberId);
	}

	async unassignUserFromTask(taskId: string, memberId: string): Promise<void> {
		await this.taskRepository.unassignUserFromTask(taskId, memberId)
	}
}

export const taskService = TaskService.getInstance(new TaskRepository());
