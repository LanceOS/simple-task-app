import { boolean, pgTable, text } from "drizzle-orm/pg-core";
import { base } from "./structures/SchemaBase.schema";



export const task = pgTable("task", {
    taskName: text("task_name").notNull(),
    description: text("description").notNull(),
    completed: boolean("completed").notNull(),
    ...base("task")
})