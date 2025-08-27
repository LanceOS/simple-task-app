import { InviteRepository } from "../repositories/Invite.repository";



export class InviteService {
    private static instance: InviteService;

    constructor(private inviteRepository: InviteRepository) {}

    public static getInstance(inviteRepository: InviteRepository) {
        if(!InviteService.instance) {
            InviteService.instance = new InviteService(inviteRepository)
        }

        return InviteService.instance;
    }

    async sendInviteCode(groupId: string, email: string): Promise<string> {
        return await this.inviteRepository.inviteUserToGroup(groupId, email)
    }
}


export const inviteService = InviteService.getInstance(new InviteRepository())