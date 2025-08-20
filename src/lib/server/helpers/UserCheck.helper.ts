import { auth } from "$lib/auth"

export const GetUser = async (request: Request) => {
    const session = await auth.api.getSession({
        headers: request.headers
    });

    return session?.user
} 