import { Journalist } from "../@types/Journal.types";
import { JournalRepository } from "../repositories/JournalRepo.repository";


export class JournalService {

    constructor(private journalRepo: JournalRepository) {}

    public async write({ action, description, metadata}: Journalist) {
        this.journalRepo.createJournal({action, description, metadata})
    }
}
