import { error } from "console";



export const load: PageServerLoad = async ({ request, params }) => {
    try {
        const { taskId } = params
        console.log(taskId)
    }
    catch(err: any) {
        return error(500, err.message)
    }
}