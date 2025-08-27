import type { JoinedGroupsResponse } from '$lib/@types/Groups.types';
import { GroupRespository } from '../repositories/Group.repository';
import type { IGroups } from '../schemas/task_group.schema';

export class GroupService {
	constructor(private groupRepository: GroupRespository) {}

	async getUserOwnedGroups(userId: string): Promise<IGroups[]> {
		return this.groupRepository.findGroupsByOwnerId(userId);
	}

	async getJoinedGroups(userId: string): Promise<JoinedGroupsResponse[]> {
		return this.groupRepository.findJoinedGroups(userId);
	}

	async createNewGroup(
		data: { name: string; description: string },
		userId: string
	): Promise<string> {
		const newGroup = await this.groupRepository.create({
			groupName: data.name,
			description: data.description,
			ownerId: userId
		});

		await this.groupRepository.addMember({
			parentGroupId: newGroup,
			userId: userId,
			isAdmin: true
		})

		return newGroup
	}
}
