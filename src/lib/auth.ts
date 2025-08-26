import { betterAuth } from 'better-auth';
import { drizzleAdapter } from 'better-auth/adapters/drizzle';
import { DrizzleDB } from './Drizzle.js';
import * as authentication from './server/schemas/authentication.js';
import { PUBLIC_URL } from '$env/static/public';
import { emailOTP } from 'better-auth/plugins';
import { mailServiceResend } from './server/services/MailMan.js';

// Initialize the 'betterAuth' instance
export const auth = betterAuth({
	database: drizzleAdapter(DrizzleDB, {
		provider: 'pg', // Specifies PostgreSQL
		schema: authentication // Link to the authentication schemas
	}),
	session: {
		expiresIn: 60 * 60 * 24 * 7, // 7 days
		updateAge: 60 * 60 * 24 // Update every 24 hours of activity
	},
	user: {
		additionalFields: {
			role: {
				type: 'string',
				defaultValue: 'user' // Default role for new users
			}
		}
	},
	plugins: [
		emailOTP({
			async sendVerificationOTP({ email, otp, type }) {
                await mailServiceResend.sendMail({
					from: "noreply@lancehemphill.com",
                    to: [email],
                    subject: "One time login code",
                    html: `Your one time login is ${otp}`,
                })
			}
		})
	],
	emailAndPassword: {
		enabled: true,
		autoSignIn: false
	},
	socialProviders: {
		// Add configurations for social logins here
	},
	databaseHooks: {
		// Add custom database logic here
	},
	rateLimit: {
		window: 10, // 10-second window
		max: 100 // Max 100 requests
	},
	basePath: '/api/auth', // Base path for authentication routes
	trustedOrigins: [`${PUBLIC_URL}`] // Only allow requests from the app's URL
});
