import { and, eq } from "drizzle-orm";
import { DrizzleDB } from "../database/Drizzle";
import { ITask, task } from "../database/schemas/task.schema";
import {
    ITaskAssignee,
    taskAssignee,
} from "../database/schemas/task_assignee.schema";

export class TaskRepository {
    private db = DrizzleDB;

    async findTask(groupId: string): Promise<ITask[]> {
        const tasksInGroup = await this.db.query.task.findMany({
            where: eq(task.parentGroupId, groupId),
        });
		return tasksInGroup
    }

    async removeTaskAssignees(groupId: string): Promise<ITaskAssignee> {
        const [removedAssignee] = await this.db.transaction(async (tx) => {
            const foundTask = await tx.query.task.findFirst({
                where: eq(task.parentGroupId, groupId),
            });
            return await tx
                .update(taskAssignee)
                .set({ isDeleted: true })
                .where(eq(taskAssignee.parentTaskId, foundTask.id))
                .returning();
        });

        return removedAssignee;
    }

    async deleteTask(groupId: string): Promise<ITask> {
        const [removedTask] = await this.db
            .update(task)
            .set({ isDeleted: true })
            .where(eq(task.parentGroupId, groupId))
            .returning();
        return removedTask;
    }
}
