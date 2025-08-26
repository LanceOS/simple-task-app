import { DrizzleDB } from "$lib/Drizzle"
import { journal } from "../schemas/journal.schema"


interface Journalist {
    action: string,
    description: string,
    metadata: Record<string, any>;
}

export const Journalist = {
    write: async ({action, description, metadata}: Journalist) => {
        return await DrizzleDB.insert(journal).values({
            action,
            description,
            metadata
        })
    }
}