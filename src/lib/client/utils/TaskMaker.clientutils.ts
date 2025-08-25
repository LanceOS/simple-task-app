import { FetchHandler } from "../functions/FetchHandler.helper"
import { Toaster } from "../components/toaster/Toaster"
import type { INewTask } from "$lib/@types/Tasks.types";
import { goto } from "$app/navigation";


export const TaskMaker = {
    createTask: async (data: INewTask) => {
        try {
            if(!data.groupId || !data.name || !data.description) {
                Toaster.ejectToast({
                    message: "Missing info for creating new task!",
                    type: "error"
                })
                return;
            }

            const response = await FetchHandler.fetch(`/groups/${data.groupId}/create_task`, "post", data)

            const res = await response.json()
            console.log(res)

            if(response.ok) {
                Toaster.ejectToast({
                    message: "Created Task!",
                    type: "success"
                })
                goto(`/groups/group/${data.groupId}/task/${res.id}`)           
                return response
            }
        }
        catch(error: any) {
            Toaster.ejectToast({
                message: "Failed to create new task!",
                type: "error"
            })
        }
    }
}