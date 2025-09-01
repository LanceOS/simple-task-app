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

interface EssentialUserData {
	id: string;
	name: string;
	image: string | null;
}

export interface AssignedMembers extends ITaskAssignee {
	assignee: EssentialUserData
}

export interface Members extends IGroupMember {
	user: EssentialUserData;
}
