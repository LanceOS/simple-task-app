import { Toaster } from "../components/toaster/Toaster"
import { goto } from "$app/navigation";
import type { CreateTaskPayload } from "$lib/@types/Groups.types";
import { HttpService } from "../functions/HttpService";

const http = HttpService.getInstance();

export const TaskMaker = {
    createTask: async (data: CreateTaskPayload) => {
        try {
            if(!data.groupId || !data.name || !data.description) {
                Toaster.ejectToast({
                    message: "Missing info for creating new task!",
                    type: "error"
                })
                return;
            }

            const response = await http.post<Response, typeof data>(`groups/${data.groupId}/create_task`, data)

            const res = await response.json()
            console.log(res)

            if(response.ok) {
                Toaster.ejectToast({
                    message: "Created Task!",
                    type: "success"
                })
                goto(`/groups/${data.groupId}/task/${res.id}`)           
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