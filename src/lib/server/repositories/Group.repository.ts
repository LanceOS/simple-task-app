import { DrizzleDB } from '$lib/Drizzle';
import { and, eq, ne } from 'drizzle-orm';
import { taskGroup, type IGroups } from '../schemas/task_group.schema';
import { groupMember, type IGroupMember } from '../schemas/group_members.schema';
import type { AddMemberParams, CreateGroupPayload, JoinedGroupsResponse, Members } from '$lib/@types/Groups.types';

export class GroupRepository {
	private db = DrizzleDB;

	async findGroupsByOwnerId(userId: string) {
		return await this.db.query.taskGroup.findMany({
			where: eq(taskGroup.ownerId, userId)
		});
	}
	async findJoinedGroups(userId: string): Promise<JoinedGroupsResponse[]> {
		return await this.db
			.select({
				id: taskGroup.id,
				name: taskGroup.name,
				description: taskGroup.description
			})
			.from(taskGroup)
			.innerJoin(groupMember, eq(taskGroup.id, groupMember.parentGroupId))
			.where(and(eq(groupMember.userId, userId), ne(taskGroup.ownerId, userId)));
	}

	async create(groupData: CreateGroupPayload): Promise<IGroups> {
		const [group] = await this.db.insert(taskGroup).values(groupData).returning();
		return group
	}

	async addMember(memberData: AddMemberParams): Promise<void> {
		await this.db.insert(groupMember).values(memberData);
	}

	async findGroupMembers(groupId: string): Promise<Members<{ id: string, name: string, image: string | null }>[]> {
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
		});
	}

	async isCurrentUserAdmin(userId: string, groupId: string): Promise<boolean> {
		const member = await this.db.query.groupMember.findFirst({
			where: and(eq(groupMember.parentGroupId, groupId), eq(groupMember.userId, userId)),
			columns: {
				isAdmin: true
			}
		});

		return !!member?.isAdmin
	}

	async isUserMember(groupId: string, userId: string): Promise<boolean> {
		const result = await this.db.query.groupMember.findFirst({
			where: and(eq(groupMember.userId, userId), eq(groupMember.parentGroupId, groupId)),
			columns: { id: true }
		});

		return !!result;
	}
}
