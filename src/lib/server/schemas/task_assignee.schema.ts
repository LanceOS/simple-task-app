import { pgTable, text, uuid } from "drizzle-orm/pg-core";
import { task } from "./task.schema";
import { base } from "./structures/SchemaBase.schema";
import type { InferSelectModel } from "drizzle-orm";
import { groupMember } from "./group_members.schema";


export const taskAssignee = pgTable("task_assignee", {
    parentTaskId: uuid("parent_task_id").references(() => task.id, { onDelete: 'cascade' }).notNull(),
    assigneeId: text("assignee_id").references(() => groupMember.userId, { onDelete: 'cascade' }).notNull(),
    ...base("task_assignee")
})

export type ITaskAssignee = InferSelectModel<typeof taskAssignee>