import { DrizzleDB } from "$lib/Drizzle"
import { eq } from "drizzle-orm"
import { task } from "../schemas/task.schema"
import type { INewTask } from "$lib/@types/Tasks.types"



export const TaskManager = {
    getTasks: async (groupId: string) => {
        return await DrizzleDB.query.task.findMany({
            where: eq(task.parentGroupId, groupId)
        })
    },

    createTask: async (data: INewTask) => {
        return await DrizzleDB.insert(task).values({
            taskName: data.name,
            description: data.description,
            parentGroupId: data.groupId
        }).returning({ id: task.id })
    },

    getSingleTask: async (taskId: string) => {
        return await DrizzleDB.query.task.findFirst({
            where: eq(task.id, taskId)
        })
    },
}