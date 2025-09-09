import { Journalist } from "../@types/Journal.types";
import { DrizzleDB } from "../database/Drizzle";
import { journal } from "../database/schemas/journal.schema";



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