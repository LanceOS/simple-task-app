import { HttpError } from '../helpers/ResponseHandler.helper';
import { InviteRepository } from '../repositories/InviteRepo.repository';
import type { IInviteSchema } from '../schemas/invite_code.schema';

export class InviteService {
	private static instance: InviteService;

	constructor(private inviteRepository: InviteRepository) {}

	public static getInstance(inviteRepository: InviteRepository) {
		if (!InviteService.instance) {
			InviteService.instance = new InviteService(inviteRepository);
		}

		return InviteService.instance;
	}

	async removeExpiredCode(code: string): Promise<void> {
		return await this.inviteRepository.removeCode(code);
	}

	async sendInviteCode(groupId: string, email: string): Promise<string> {
		return await this.inviteRepository.inviteUserToGroup(groupId, email);
	}

	async getValidCode(userEmail: string, code: string): Promise<IInviteSchema> {
		const exists = await this.inviteRepository.validateCode(code);

		if (!exists) {
			throw new HttpError("This code is invalid or doesn't exist!", 404);
		}
		if (userEmail !== exists?.sentTo) {
			throw new HttpError("This is not your code!", 401);
		}
		const expiresAt = new Date(exists.expiresAt);
		const now = new Date();

		if (expiresAt < now) {
			this.removeExpiredCode(code);
			throw new HttpError("This code has expired!", 400);
		}

		this.removeExpiredCode(code);
		return exists;
	}
}

export const inviteService = InviteService.getInstance(new InviteRepository());
