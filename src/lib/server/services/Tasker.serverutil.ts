import type { CreateTaskPayload } from "$lib/@types/Groups.types";
import type { TaskRepository } from "../repositories/Task.repository";
import type { ITask } from "../schemas/task.schema";
import type { ITaskAssignee } from "../schemas/task_assignee.schema";



export class TaskService {
    constructor(private taskRepository: TaskRepository) {}
        
    async createTask(data: CreateTaskPayload): Promise<string> {
        return await this.taskRepository.create(data);
    }

    async getAllTasks(groupId: string): Promise<ITask[]> {
        return await this.taskRepository.findTasks(groupId)
    }

    async getTask(taskId: string): Promise<ITask | undefined> {
        return await this.taskRepository.findSingleTask(taskId)
    }

    async getAssignees(taskId: string): Promise<ITaskAssignee[]> {
        return await this.taskRepository.findAssignees(taskId)
    }

    async assignUserToTask(taskId: string, userId: string): Promise<string> {
        return await this.taskRepository.assignUserToTask(taskId, userId)
    }
}