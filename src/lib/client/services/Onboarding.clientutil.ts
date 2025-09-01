import { HttpError } from "$lib/server/helpers/ResponseHandler.helper";
import { validateSessionOrRedirect } from "../helpers/ValidateClientAuth.helper";

export class Onboarding {
	public static async setName(name: string) {
		await validateSessionOrRedirect()

		if(!name) {
			throw new HttpError("Missing name!", 400)
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
