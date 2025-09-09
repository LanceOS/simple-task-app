import { Journalist } from "../@types/Journal.types";
import { DrizzleDB } from "../Drizzle";
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