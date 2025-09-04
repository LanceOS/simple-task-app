<script lang="ts">
	import Button from '$lib/client/components/ui/Button.svelte';
	import Input from '$lib/client/components/ui/Input.svelte';
	import Textarea from '$lib/client/components/ui/Textarea.svelte';
	import Icon from '@iconify/svelte';
	import { GroupClient } from '$lib/client/services/GroupClient.clientutil';
	import type { PageProps } from './$types';
	import { Toaster } from '$lib/client/components/toaster/Toaster';
	import type { IGroups } from '$lib/server/schemas/task_group.schema';
	import { goto } from '$app/navigation';

	const { data }: PageProps = $props();
	let ownedGroups: IGroups[] = $state(data.ownedGroups);
	let joinedGroups = $state(data.joinedGroups);

	let createTask: boolean = $state(false);
	let disableActionButtons: boolean = $state(false);

	let newGroupDetails: { name: string; description: string } = $state({
		name: '',
		description: ''
	});

	let joinCode: string = $state('');

	const createGroup = async () => {
		try {
			const response = await GroupClient.createGroup(newGroupDetails);
			Toaster.ejectToast({
				message: 'Created new task group!',
				type: 'success'
			});
			goto(`/groups/${response}`);
		} catch (error: any) {
			Toaster.ejectToast({
				message: error.message || 'Failed to create new group!',
				type: 'error'
			});
		}
	};

	const joinGroup = async () => {
		try {
			const response = await GroupClient.joinGroup(joinCode);
			Toaster.ejectToast({
				message: 'Successfully joined group!',
				type: 'success'
			});
			goto(`/groups/${response}`);
		} catch (error: any) {
			Toaster.ejectToast({
				message: error.message || 'Failed to join group!',
				type: 'error'
			});
		}
	};
</script>

<main class="bg-base-100 border min-h-[calc(100vh-40px)] grid grid-cols-[0px_minmax(900px,_1fr)_100px]">
	<section class="border col-span-1 h-full w-72">

	</section>
	<section class="border col-span-2 h-full">

	</section>
</main>
