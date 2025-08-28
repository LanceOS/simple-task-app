import { goto } from '$app/navigation';
import { Toaster } from '../components/toaster/Toaster';

export const Onboarding = {
	setName: async (name: string) => {
		try {
			const response = await fetch('/onboarding', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(name)
			});

			if (!response.ok) {
				Toaster.ejectToast({
					message: 'Failed to set username! (Server Error)',
					type: 'error'
				});
				throw new Error('Server response was not ok.');
			}
			Toaster.ejectToast({
				message: `Successfully set username to ${name}`,
				type: 'success'
			});
            goto("/")
		} catch (error: any) {
			Toaster.ejectToast({
				message: 'Failed to set username!',
				type: 'error'
			});
		}
	}
};
