import { pgTable, text, uuid } from "drizzle-orm/pg-core";
import { base } from "./structures/SchemaBase.schema";
import { taskGroup } from "./task_group.schema";


export const inviteCode = pgTable("invite_code", {
    code: text("code").notNull(),
    parentGroupId: uuid("parent_group_id").references(() => taskGroup.id).notNull(),
    ...base("code")
})