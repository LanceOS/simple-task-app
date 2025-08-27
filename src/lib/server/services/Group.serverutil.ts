import type { CreateGroupPayload, JoinedGroupsResponse } from '$lib/@types/Groups.types';
import { GroupRepository } from '../repositories/Group.repository';
import type { IGroupMember } from '../schemas/group_members.schema';
import type { IGroups } from '../schemas/task_group.schema';

export class GroupService {
	private static instance: GroupService
	constructor(private groupRepository: GroupRepository) {}

	public static getInstance(groupRepository: GroupRepository): GroupService {
		if(!GroupService.instance) {
			GroupService.instance = new GroupService(groupRepository)
		}
		return GroupService.instance;
	}

	async getUserOwnedGroups(userId: string): Promise<IGroups[]> {
		return this.groupRepository.findGroupsByOwnerId(userId);
	}

	async getJoinedGroups(userId: string): Promise<JoinedGroupsResponse[]> {
		return this.groupRepository.findJoinedGroups(userId);
	}

	async createNewGroup(
		data: CreateGroupPayload,
		userId: string
	): Promise<string> {
		const newGroup = await this.groupRepository.create({
			name: data.name,
			description: data.description,
			ownerId: userId
		});

		await this.groupRepository.addMember({
			parentGroupId: newGroup.id,
			userId: userId,
			isAdmin: true
		})

		return newGroup.id
	}

	async getMembers(groupId: string): Promise<IGroupMember[]> {
		return this.groupRepository.findGroupMembers(groupId)
	}
}

export const groupService = GroupService.getInstance(new GroupRepository())
