import { DrizzleDB } from '$lib/Drizzle';
import { and, eq, inArray, ne } from 'drizzle-orm';
import { taskGroup } from '../schemas/task_group.schema';
import { groupMember } from '../schemas/group_members.schema';
import { user } from '../schemas/authentication';

export const GroupManager = {
	getUserOwnedGroups: async (userId: string) => {
		return await DrizzleDB.query.taskGroup.findMany({
			where: eq(taskGroup.ownerId, userId)
		});
	},
	getJoinedGroups: async (userId: string) => {
		return await DrizzleDB.select({
			id: taskGroup.id,
			groupName: taskGroup.groupName,
			description: taskGroup.description
		})
			.from(taskGroup)
			.innerJoin(groupMember, eq(taskGroup.id, groupMember.parentGroupId))
			.where(and(eq(groupMember.userId, userId), ne(taskGroup.ownerId, userId)));
	},

	createNewGroup: async (
		data: { name: string; description: string },
		userId: string
	): Promise<string> => {
		return await DrizzleDB.transaction(async (tx) => {
			const [newGroup] = await tx
				.insert(taskGroup)
				.values({
					groupName: data.name,
					description: data.description,
					ownerId: userId
				})
				.returning({ id: taskGroup.id });

			await tx.insert(groupMember).values({
				parentGroupId: newGroup.id,
				userId: userId
			});

			return newGroup.id;
		});
	},

	getGroupMembers: async (groupId: string) => {
		return await DrizzleDB.transaction(async (tx) => {
			const members = await tx.query.groupMember.findMany({
				where: eq(groupMember.parentGroupId, groupId)
			});

			if (!members || members.length === 0) {
				return [];
			}

			const memberIds = members.map((member) => member.userId!);

			return await tx.query.user.findMany({
				where: inArray(user.id, memberIds),
				columns: {
					id: true,
					name: true,
					image: true
				}
			})
		});
	}
};
