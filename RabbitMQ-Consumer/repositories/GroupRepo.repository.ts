import { and, eq, inArray, ne } from 'drizzle-orm';

import { DrizzleDB } from '../database/Drizzle';
import { groupMember } from '../database/schemas/group_members.schema';
import { taskGroup } from '../database/schemas/task_group.schema';

export class GroupRepository {
	private db = DrizzleDB;

	async removeMember(groupIds: string[], userId: string): Promise<void> {
		await this.db
			.update(groupMember)
			.set({ isDeleted: true })
			.where(
				and(
					inArray(groupMember.parentGroupId, groupIds),
					eq(groupMember.userId, userId),
					eq(groupMember.isDeleted, false)
				)
			);
	}

	async deleteGroup(groupIds: string[], userId: string): Promise<void> {
		await this.db
			.update(taskGroup)
			.set({ isDeleted: true })
			.where(
				and(
					inArray(taskGroup.id, groupIds),
					eq(taskGroup.ownerId, userId),
					eq(taskGroup.isDeleted, false)
				)
			);
	}
}
