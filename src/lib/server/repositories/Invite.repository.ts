import { DrizzleDB } from '$lib/Drizzle';
import { nanoid } from 'nanoid/non-secure';
import { inviteCode } from '../schemas/invite_code.schema';

export class InviteRepository {
	private db = DrizzleDB;

	async inviteUserToGroup(groupId: string, email: string): Promise<string> {
		const [code] = await DrizzleDB.insert(inviteCode)
			.values({
				code: nanoid(),
				parentGroupId: groupId,
				sentTo: email
			})
			.returning({ code: inviteCode.code });

		return code.code;
	}
}
