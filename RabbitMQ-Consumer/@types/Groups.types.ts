import type { IGroupMember } from '$lib/server/schemas/group_members.schema';
import type { ITaskAssignee } from '$lib/server/schemas/task_assignee.schema';

export interface CreateGroupPayload {
	name: string;
	description: string;
	ownerId: string;
}

export interface CreateTaskPayload {
	name: string;
	description: string;
	groupId: string;
}

export interface CreateMemberPayload {
	userId: string;
	parentGroupId: string;
	isAdmin?: boolean;
}

export interface JoinedGroupsResponse {
	id: string;
	name: string;
	description: string;
}

interface EssentialMemberData {
	id: string;
	name: string;
	image: string | null;
}

export interface GroupMembers extends IGroupMember {
	member: EssentialMemberData;
}

export interface TaskAssignees extends ITaskAssignee {
	member: EssentialMemberData
}