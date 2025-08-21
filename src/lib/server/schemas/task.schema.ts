import { boolean, pgTable, text, uuid } from "drizzle-orm/pg-core";
import { base } from "./structures/SchemaBase.schema";
import { taskGroup } from "./task_group.schema";



export const task = pgTable("task", {
    taskName: text("task_name").notNull(),
    description: text("description").notNull(),
    completed: boolean("completed").default(false).notNull(),
    parentGroupId: uuid("parent_group_id").references(() => taskGroup.id).notNull(),
    ...base("task")
})