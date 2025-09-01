import type { CreateTaskPayload, TaskAssignees } from '$lib/@types/Groups.types';
import { HttpError } from '../helpers/ResponseHandler.helper';
import { TaskRepository } from '../repositories/TaskRepo.repository';
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

	async getTask(taskId: string): Promise<ITask> {
		const task = await this.taskRepository.findSingleTask(taskId);
		if(!task) {
			throw new HttpError("Failed to find task!", 404)
		}
		return task
	}

	async getAssignees(
		taskId: string
	): Promise<TaskAssignees[]> {
		return await this.taskRepository.findAssignees(taskId);
	}

	async assignUserToTask(taskId: string, memberId: string): Promise<TaskAssignees> {
		return await this.taskRepository.assignUserToTask(taskId, memberId);
	}

	async unassignUserFromTask(taskId: string, memberId: string): Promise<void> {
		await this.taskRepository.unassignUserFromTask(taskId, memberId)
	}

	async deleteTask(taskId: string) {
		await this.taskRepository.deleteTask(taskId)
	}
}

export const taskService = TaskService.getInstance(new TaskRepository());
