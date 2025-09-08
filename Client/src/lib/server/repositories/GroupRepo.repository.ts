import { DrizzleDB } from '$lib/Drizzle';
import { and, eq, inArray, ne } from 'drizzle-orm';
import { taskGroup, type IGroups } from '../schemas/task_group.schema';
import { groupMember } from '../schemas/group_members.schema';
import type {
	CreateGroupPayload,
	CreateMemberPayload,
	GroupMembers,
	JoinedGroupsResponse
} from '$lib/@types/Groups.types';

export class GroupRepository {
	private db = DrizzleDB;

	async findGroupById(groupId: string): Promise<IGroups | undefined> {
		return await this.db.query.taskGroup.findFirst({
			where: and(eq(taskGroup.id, groupId), eq(taskGroup.isDeleted, false))
		});
	}

	async findGroupsByOwnerId(userId: string) {
		return await this.db.query.taskGroup.findMany({
			where: and(eq(taskGroup.ownerId, userId), eq(taskGroup.isDeleted, false))
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
			.where(
				and(
					eq(groupMember.userId, userId),
					ne(taskGroup.ownerId, userId),
					eq(groupMember.isDeleted, false)
				)
			);
	}

	async create(groupData: CreateGroupPayload): Promise<IGroups> {
		const [group] = await this.db.insert(taskGroup).values(groupData).returning();
		return group;
	}

	async addMember(memberData: CreateMemberPayload): Promise<void> {
		await this.db.insert(groupMember).values(memberData);
	}

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

	async findGroupMembers(groupId: string): Promise<GroupMembers[]> {
		return await this.db.query.groupMember.findMany({
			where: and(eq(groupMember.parentGroupId, groupId), eq(groupMember.isDeleted, false)),
			with: {
				member: {
					columns: {
						id: true,
						name: true,
						image: true
					}
				}
			}
		});
	}

	async isCurrentUserAdmin(userId: string, groupId: string): Promise<boolean> {
		const member = await this.db.query.groupMember.findFirst({
			where: and(
				eq(groupMember.parentGroupId, groupId),
				eq(groupMember.userId, userId),
				eq(groupMember.isDeleted, false)
			),
			columns: {
				isAdmin: true
			}
		});

		return !!member?.isAdmin;
	}

	async isUserMember(groupId: string, userId: string): Promise<boolean> {
		const result = await this.db.query.groupMember.findFirst({
			where: and(
				eq(groupMember.userId, userId),
				eq(groupMember.parentGroupId, groupId),
				eq(groupMember.isDeleted, false)
			),
			columns: { id: true }
		});

		return !!result;
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
