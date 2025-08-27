import type { IGroupMember } from "$lib/server/schemas/group_members.schema";
import type { ITaskAssignee } from "$lib/server/schemas/task_assignee.schema";

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

export interface AssignedMembers<TUser> extends ITaskAssignee {
    assignee: TUser;
}


export interface Members<TUser> extends IGroupMember {
    user: TUser
}