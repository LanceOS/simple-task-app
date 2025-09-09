import { pgTable, text, uuid } from "drizzle-orm/pg-core";
import { task } from "./task.schema";
import { base } from "./structures/SchemaBase.schema";
import type { InferSelectModel } from "drizzle-orm";
import { user } from "./authentication";


export const taskAssignee = pgTable("task_assignee", {
    parentTaskId: uuid("parent_task_id").references(() => task.id).notNull(),
    assigneeId: text("assignee_id").references(() => user.id).notNull(),
    ...base("task_assignee")
})

export type ITaskAssignee = InferSelectModel<typeof taskAssignee>