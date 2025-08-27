export interface CreateGroupPayload {
    groupName: string;
    description: string;
    ownerId: string;
}

export interface CreateTaskPayload {
    name: string;
    description: string;
    groupId: string;
}

export interface AddMemberParams {
    userId: string;
    parentGroupId: string;
    isAdmin?: boolean;
}


export interface JoinedGroupsResponse {
    id: string;
    groupName: string;
    description: string;
}