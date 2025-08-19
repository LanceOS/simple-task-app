import { boolean, text, timestamp, uuid } from "drizzle-orm/pg-core"



export const base = (type: string) => {
    return {
        id: uuid("id").primaryKey().defaultRandom(),
        type: text("type").default(type).notNull(),
        isDeleted: boolean("is_deleted").default(false).notNull(),
        createdAt: timestamp("created_at").defaultNow().notNull(),
        updatedAt: timestamp("updated_at").$onUpdateFn(() => new Date()).notNull()
    }
}