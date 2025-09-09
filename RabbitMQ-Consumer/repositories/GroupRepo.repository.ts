import { eq } from 'drizzle-orm';

import { DrizzleDB } from '../database/Drizzle';
import { groupMember, IGroupMember } from '../database/schemas/group_members.schema';


export class GroupRepository {
	private db = DrizzleDB;

	async removeGroupMembers(groupId: string): Promise<IGroupMember> {
		const [member] = await this.db.update(groupMember).set({ isDeleted: true }).where(eq(groupMember.parentGroupId, groupId)).returning()
		return member
	}
}
