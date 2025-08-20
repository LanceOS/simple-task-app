import { DrizzleDB } from '$lib/Drizzle';
import { eq, inArray } from 'drizzle-orm';
import { taskGroup } from '../schemas/task_group.schema';
import { groupMember } from '../schemas/group_members.schema';

export const GroupManager = {
	getUserOwnedGroups: async (userId: string) => {
		return await DrizzleDB.query.taskGroup.findMany({
			where: eq(taskGroup.ownerId, userId)
		});
	},
	getJoinedGroups: async (userId: string) => {
		return await DrizzleDB.transaction(async (tx) => {
			const groups = await tx.query.groupMember.findMany({
				where: eq(groupMember.userId, userId)
			});

			if (groups.length === 0) {
				return []
			}

			const idArr = groups.map((group) => group.parentGroupId!);

			return await tx.query.taskGroup.findMany({
				where: inArray(taskGroup.id, idArr!)
			});
		});
	}
};
