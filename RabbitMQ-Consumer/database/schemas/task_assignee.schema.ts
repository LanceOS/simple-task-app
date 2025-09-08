import { pgTable, text, uuid } from "drizzle-orm/pg-core";
import { task } from "./task.schema.ts";
import { base } from "./structures/SchemaBase.schema.ts";
import type { InferSelectModel } from "drizzle-orm";
import { groupMember } from "./group_members.schema.ts";


export const taskAssignee = pgTable("task_assignee", {
    parentTaskId: uuid("parent_task_id").references(() => task.id).notNull(),
    assigneeId: text("assignee_id").references(() => groupMember.userId).notNull(),
    ...base("task_assignee")
})

export type ITaskAssignee = InferSelectModel<typeof taskAssignee>