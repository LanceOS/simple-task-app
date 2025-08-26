import { DrizzleDB } from '$lib/Drizzle';
import { and, eq, ne } from 'drizzle-orm';
import { taskGroup } from '../schemas/task_group.schema';
import { groupMember } from '../schemas/group_members.schema';

export class GroupRespository {
	private db = DrizzleDB;


	async findManyByOwnerId (userId: string) {
		return await this.db.query.taskGroup.findMany({
			where: eq(taskGroup.ownerId, userId)
		});
	}
	async findJoinedGroups (userId: string) {
		return await this.db.select({
			id: taskGroup.id,
			groupName: taskGroup.groupName,
			description: taskGroup.description
		})
			.from(taskGroup)
			.innerJoin(groupMember, eq(taskGroup.id, groupMember.parentGroupId))
			.where(and(eq(groupMember.userId, userId), ne(taskGroup.ownerId, userId)));
	}

	async create(
		data: { name: string; description: string },
		userId: string
	): Promise<string> {
		return await this.db.transaction(async (tx) => {
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
	}

	async getGroupMembers (groupId: string) {
		return await this.db.query.groupMember.findMany({
			where: eq(groupMember.parentGroupId, groupId),
			with: {
				user: {
					columns: {
						id: true,
						name: true,
						image: true
					}
				}
			},
			columns: {
				isAdmin: true,
				createdAt: true,
				parentGroupId: true
			}
		});
	}

	async isCurrentUserAdmin(userId: string, groupId: string) {
		return await this.db.query.groupMember.findFirst({
			where: and(eq(groupMember.parentGroupId, groupId), eq(groupMember.userId, userId)),
			columns: {
				isAdmin: true
			}
		});
	}

	async isUserMember (userId: string, groupId: string) {
		const result = await this.db.query.groupMember.findFirst({
			where: and(eq(groupMember.userId, userId), eq(groupMember.parentGroupId, groupId)),
			columns: { id: true }
		});

		return !!result;
	}
};
