import { authClient } from '$lib/auth-client';

export const SignInService = {
    async sendEmailOTP(email: string) {
        if (!email.includes('@')) {
            throw new Error('Invalid email');
        }
        await authClient.emailOtp.sendVerificationOtp({ email, type: 'sign-in' });
    },
    async confirmCode(email: string, otp: string) {
        await authClient.signIn.emailOtp({ email, otp });
    }
};