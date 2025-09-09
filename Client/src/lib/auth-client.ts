import { emailOTPClient, inferAdditionalFields } from "better-auth/client/plugins";
import { createAuthClient } from "better-auth/svelte";
import type { auth } from './auth.js';
import { PUBLIC_URL } from "$env/static/public";

// Create the main client-side authentication instance
export const authClient = createAuthClient({
    baseURL: `${PUBLIC_URL}/api/auth`,
    plugins: [inferAdditionalFields<typeof auth>(), emailOTPClient()],
});

// Export key authentication functions for easy access
export const { signIn, signUp, useSession, getSession } = createAuthClient();

// Define the TypeScript type for the user session
export type Session = typeof authClient.$Infer.Session;