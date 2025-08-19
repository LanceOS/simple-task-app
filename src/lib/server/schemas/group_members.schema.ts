import { pgTable, text, uuid } from "drizzle-orm/pg-core";
import { user } from "./authentication";
import { taskGroup } from "./task_group.schema";
import { base } from "./structures/SchemaBase.schema";


export const groupMember = pgTable("group_member", {
    userId: text("user_id").references(() => user.id),
    parentGroupId: uuid("parent_group_id").references(() => taskGroup.id),
    ...base("group_member")
})