import { json, pgTable, text } from "drizzle-orm/pg-core";
import { base } from "./structures/SchemaBase.schema";



export const journal = pgTable("journal", {
    action: text("action").notNull(),
    description: text("description").notNull(),
    metadata: json("metadata").notNull(),
    ...base("journal")
})