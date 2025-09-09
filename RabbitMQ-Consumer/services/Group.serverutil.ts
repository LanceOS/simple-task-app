import { IGroups } from '../database/schemas/task_group.schema';
import { GroupRepository } from '../repositories/GroupRepo.repository';

export class GroupService {
	private static instance: GroupService;
	constructor(private groupRepository: GroupRepository) {}

	public static getInstance(groupRepository: GroupRepository): GroupService {
		if (!GroupService.instance) {
			GroupService.instance = new GroupService(groupRepository);
		}
		return GroupService.instance;
	}

	async deleteGroupMember(groupIds: string[]): Promise<void> {
		if (groupIds.length === 0) {
			throw new Error('No groups provided for exit!');
		}
		await this.groupRepository.removeMember(groupIds);
	}

	async deleteGroup(groupIds: string[]): Promise<void> {
		if (groupIds.length === 0) {
			throw new Error('No groups provided for deletion!');
		}
		for(let i = 0; i < groupIds.length; i++) {
			await this.groupRepository.deleteGroup(groupIds);
		}
	}
}

export const groupService = GroupService.getInstance(new GroupRepository());
