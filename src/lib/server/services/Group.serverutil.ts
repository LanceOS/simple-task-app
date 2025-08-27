import type { CreateGroupPayload, JoinedGroupsResponse, Members } from '$lib/@types/Groups.types';
import { GroupRepository } from '../repositories/Group.repository';
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

	async getAllMembers(groupId: string): Promise<Members<{ id: string, name: string, image: string | null }>[]> {
		return this.groupRepository.findGroupMembers(groupId)
	}

	async isMemberAdmin(groupId: string, userId: string): Promise<boolean> {
		return await this.groupRepository.isCurrentUserAdmin(groupId, userId);
	}

	async isMember(groupId: string, userId: string): Promise<boolean> {
		return await this.groupRepository.isUserMember(groupId, userId)
	}
}

export const groupService = GroupService.getInstance(new GroupRepository())
