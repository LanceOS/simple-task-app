import type { Journalist } from "$lib/@types/Journal.types";
import { JournalRepository } from "../repositories/JournalRepo.repository";



export class JournalService {
    private static instance: JournalService;
    constructor(private journalRepository: JournalRepository) {}

    public static getInstance(journalRepository: JournalRepository) {
        if(!JournalService.instance) {
            JournalService.instance = new JournalService(journalRepository)
        }
    }

    async writeJournal(data: Journalist): Promise<void> {
        await this.journalRepository.createJournal(data)
    }
}

export const journalService = JournalService.getInstance(new JournalRepository())