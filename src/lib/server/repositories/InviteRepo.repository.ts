import { DrizzleDB } from '$lib/Drizzle';
import { nanoid } from 'nanoid/non-secure';
import { inviteCode, type IInviteSchema } from '../schemas/invite_code.schema';
import { eq } from 'drizzle-orm';

export class InviteRepository {
	private db = DrizzleDB;

	async inviteUserToGroup(groupId: string, email: string): Promise<string> {
		const [code] = await this.db
			.insert(inviteCode)
			.values({
				code: nanoid(),
				parentGroupId: groupId,
				sentTo: email
			})
			.returning({ code: inviteCode.code });

		return code.code;
	}

	async validateCode(code: string): Promise<IInviteSchema | undefined> {
		return await this.db.query.inviteCode.findFirst({
			where: eq(inviteCode.code, code)
		});
	}

	async removeCode(code: string): Promise<void> {
		await this.db.delete(inviteCode).where(eq(inviteCode.code, code));
		return;
	}
}
