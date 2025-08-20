import { pgTable, text } from "drizzle-orm/pg-core";
import { base } from "./structures/SchemaBase.schema";
import { user } from "./authentication";


export const taskGroup = pgTable("task_group", {
    groupName: text("group_name").notNull(),
    description: text("description").notNull(),
    ownerId: text("owner_id").references(() => user.id),
    ...base("task_group")
})