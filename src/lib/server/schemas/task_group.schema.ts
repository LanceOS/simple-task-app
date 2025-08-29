import { pgTable, text } from "drizzle-orm/pg-core";
import { base } from "./structures/SchemaBase.schema";
import { user } from "./authentication";
import type { InferSelectModel } from "drizzle-orm";


export const taskGroup = pgTable("task_group", {
    name: text("group_name").notNull(),
    description: text("description").notNull(),
    ownerId: text("owner_id").references(() => user.id, { onDelete: "cascade" }).notNull(),
    ...base("task_group")
})


export type IGroups = InferSelectModel<typeof taskGroup>