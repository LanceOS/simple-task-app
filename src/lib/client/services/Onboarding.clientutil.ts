import { validateSessionOrRedirect } from "../helpers/ValidateClientAuth.helper";

export class Onboarding {
	public static async setName(name: string) {
		await validateSessionOrRedirect()

		if(!name) {
			throw new Error("Missing name!")
		}

		return await fetch('/onboarding', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(name)
		});
	}
}
