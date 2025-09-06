import type { Journalist } from "$lib/@types/Journal.types";
import { DrizzleDB } from "$lib/Drizzle";
import { journal } from "../schemas/journal.schema";


export class JournalRepository {
    private db = DrizzleDB;

    async createJournal({action, description, metadata}: Journalist) {
        return await this.db.insert(journal).values({
            action,
            description,
            metadata
        })
    }
}