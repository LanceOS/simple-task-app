import { DrizzleDB } from "$lib/Drizzle"
import { eq } from "drizzle-orm"
import { task } from "../schemas/task.schema"



export const TaskManager = {
    getTasks: async (groupId: string) => {
        return await DrizzleDB.query.task.findMany({
            where: eq(task.parentGroupId)
        })
    }
}