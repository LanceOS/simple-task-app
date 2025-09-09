import { goto } from '$app/navigation';
import { authClient } from '$lib/auth-client';
import { type User } from 'better-auth';

interface ValidatedSession {
    user: User;
}

export const validateSessionOrThrow = async (message: string): Promise<ValidatedSession> => {
    const session = await authClient.getSession();
    if (session.data?.user) {
        return { user: session.data.user };
    }
    throw new Error(message);
};


export const validateSessionOrRedirect = async (): Promise<ValidatedSession | void> => {
    const session = await authClient.getSession();
    if (session.data?.user) {
        return { user: session.data.user };
    }
    goto("/signin");
	return;
};