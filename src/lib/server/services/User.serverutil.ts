import { DrizzleDB } from "$lib/Drizzle";
import { eq } from "drizzle-orm";
import { user } from "../schemas/authentication";

export const UserServant = {
	setUsername: async (userId: string, name: string) => {
		return await DrizzleDB.update(user).set({
			name: name
		}).where(eq(user.id, userId));
	},
	
	// getUserStats: async (userId: string) => {
	// 	return await DrizzleDB.query.user.findFirst({
	// 		where: eq(user.id, userId)
	// 	})
	// }

	findUserByEmail: async (email: string) => {
		return await DrizzleDB.query.user.findFirst({
			where: eq(user.email, email),
			columns: {
				id: true,
			}
		})
	}
};
