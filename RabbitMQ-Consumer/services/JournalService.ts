

export class JournalService {

    constructor(private journalRepo: JournalRepository) {}

    public async write({ action, description, metadata}: Journalist) {
        this.journalRepo.createJournal({action, description, metadata})
    }
}