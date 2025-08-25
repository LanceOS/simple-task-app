import { Toaster } from "../components/toaster/Toaster"
import { FetchHandler } from "../functions/FetchHandler.helper"



export const Inviter = {
    sendUserInvite: async (groupId: string, email: string) => {
        if(!email) {
            Toaster.ejectToast({
                message: "Missing required data!",
                type: "error"
            })
        }

        const data = {
            groupId,
            email
        }

        try {
            const response = await FetchHandler.fetch(`/groups/${groupId}/invite_user`, "POST", data)
            
            if(response.ok) {
                Toaster.ejectToast({
                    message: "Invite sent!",
                    type: "success"
                })
            }
        }
        catch(error: any) {
            Toaster.ejectToast({
                message: "Failed to invite user!",
                type: "error"
            })
        }
    }
}