import { integer, pgTable } from "drizzle-orm/pg-core";
import { base } from "./structures/SchemaBase.schema";


export const inviteCode = pgTable("invite_code", {
    code: integer("code").notNull(),
    ...base("code")
})