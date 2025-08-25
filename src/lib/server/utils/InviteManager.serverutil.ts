import { DrizzleDB } from "$lib/Drizzle"
import { nanoid } from "nanoid"
import { inviteCode } from "../schemas/invite_code.schema"



export const InviteManager = {
    inviteUserToGroup: async (groupId: string, userId: string) => {
        return await DrizzleDB.insert(inviteCode).values({
            code: nanoid(),
            parentGroupId: groupId,
            sentTo: userId
        }).returning({ code: inviteCode.code })
    }
}