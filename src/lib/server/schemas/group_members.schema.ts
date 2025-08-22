import { boolean, pgTable, text, uuid } from "drizzle-orm/pg-core";
import { user } from "./authentication";
import { taskGroup } from "./task_group.schema";
import { base } from "./structures/SchemaBase.schema";


export const groupMember = pgTable("group_member", {
    userId: text("user_id").references(() => user.id).notNull(),
    parentGroupId: uuid("parent_group_id").references(() => taskGroup.id).notNull(),
    isAdmin: boolean("is_admin").default(false).notNull(),
    ...base("group_member")
})