import { integer, pgTable, uuid } from "drizzle-orm/pg-core";
import { taskGroup } from "./task_group.schema";



export const groupMetadata = pgTable("group_metadata", {
    parentGroupId: uuid("parent_group_id").references(() => taskGroup.id, { onDelete: 'cascade' }).notNull(),
    numOfMembers: integer("number_of_members").default(1).notNull(),
    numOfTasks: integer("number_of_tasks").default(0).notNull(),
    numOfCompleted: integer("number_of_completed").default(0).notNull(),
    numInProgress: integer("number_in_progress").default(0).notNull(),
})