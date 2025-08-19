import { pgTable, text } from "drizzle-orm/pg-core";
import { base } from "./structures/SchemaBase.schema";


export const taskGroup = pgTable("task_group", {
    groupName: text("group_name").notNull(),
    description: text("description").notNull(),
    ...base("task_group")
})