import { DrizzleDB } from "$lib/Drizzle"
import { nanoid } from "nanoid"
import { inviteCode } from "../schemas/invite_code.schema"



export const InviteManager = {
    inviteUserToGroup: async (groupId: string) => {
        return await DrizzleDB.insert(inviteCode).values({
            code: nanoid(),
            parentGroupId: groupId
        }).returning({ code: inviteCode.code })
    }
}