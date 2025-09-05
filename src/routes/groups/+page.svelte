<script lang="ts">
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

<<<<<<< HEAD
	</section>
	<section class="border col-span-2 h-full">

	</section>
=======
		<div class="space-y-6">
			<section class="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
				<div
					class="flex w-full flex-col justify-between gap-2 sm:flex-row sm:items-center sm:gap-4"
				>
					<h2 class="text-content text-2xl font-bold">Groups You Own</h2>
					<div class="flex items-center gap-4">
						<button
							type="button"
							aria-label="Create new task group"
							onclick={() => (createTask = !createTask)}
							class="btn btn-primary"
						>
							+ Create New Group
						</button>
						<a href="/manage_groups" class="btn btn-secondary"> Manage Groups </a>
					</div>
				</div>
			</section>

			{#if createTask}
				<section class="bg-base-200 rounded-xl p-8 shadow-lg">
					<h3 class="text-content mb-6 text-2xl font-bold">Create New Task Group</h3>
					<form class="space-y-6">
						<Input
							title="Name"
							type="text"
							maxlength={80}
							placeholder="Enter group name..."
							bind:input={newGroupDetails.name}
						/>
						<Textarea
							title="Group Description"
							rows={3}
							maxlength={300}
							bind:input={newGroupDetails.description}
							placeholder="Describe your group's purpose..."
						/>
						<div class="flex gap-4">
							<button type="button" onclick={createGroup} disabled={disableActionButtons}
								>Create Group</button
							>
							<button
								type="button"
								aria-label="Select group"
								class="btn btn-error"
								onclick={() => (createTask = false)}
							>
								Cancel
							</button>
						</div>
					</form>
				</section>
			{/if}
			{#if ownedGroups.length > 0}
				<section class="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
					{#each ownedGroups as owned}
						<a
							href={`/groups/${owned.id}`}
							class="bg-base-200 relative flex flex-col justify-between gap-2 rounded-xl p-6 shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
						>
							<Icon icon="noto:busts-in-silhouette" class="bg-info rounded-md p-2 text-4xl" />
							<h3 class="text-content text-xl font-bold">{owned.name}</h3>
							<p class="text-neutral leading-relaxed">
								{owned.description.length > 40
									? `${owned.description.slice(0, 40)}...`
									: owned.description}
							</p>
							<span class="success w-fit rounded-md px-2 py-1 text-xs"> Owner </span>
						</a>
					{/each}
				</section>
			{:else}
				<div class="bg-base-200 space-y-4 rounded-xl p-12 text-center">
					<Icon icon="noto:clipboard" class="w-full text-6xl" />
					<h3 class="text-content text-xl font-bold">No Groups Yet</h3>
					<p class="text-neutral">Create your first group to start collaborating with others!</p>
				</div>
			{/if}
		</div>

		<!-- Joined Groups Section -->
		<section class="space-y-6">
			<div class="flex h-8 items-center gap-4">
				<h2 class="text-content text-2xl font-bold">Groups You've Joined</h2>
			</div>

			<!-- Join Group Form -->
			<div class="bg-base-200 rounded-xl p-6">
				<h3 class="text-content mb-4 text-lg font-semibold">Join a New Group</h3>
				<form class="flex flex-col">
					<label for="code" class="text-content mb-2 block text-sm font-semibold">
						Group Code
					</label>
					<div class="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
						<input
							type="text"
							name="code"
							id="code"
							bind:value={joinCode}
							class="bg-base-100 border-base-300 focus:ring-primary text-content w-full rounded-lg border px-4 py-3 focus:ring-2 focus:outline-none"
							placeholder="Enter group code..."
						/>
						<button
							type="button"
							class="btn btn-primary"
							disabled={disableActionButtons}
							onclick={joinGroup}
						>
							Join Group
						</button>
					</div>
				</form>
			</div>

			<!-- Joined Groups Display -->
			{#if joinedGroups && joinedGroups.length > 0}
				<div class="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
					{#each joinedGroups as joined}
						<a
							href={`/groups/${joined.id}`}
							class="bg-base-200 rounded-xl p-6 shadow-md transition-all duration-300 hover:shadow-xl"
						>
							<div class="space-y-2">
								<Icon icon="twemoji:handshake" class="text-4xl" />

								<h3 class="text-content text-xl font-bold">{joined.name}</h3>
								<p class="text-neutral leading-relaxed">
									{joined.description.length > 40
										? `${joined.description.slice(0, 40)}...`
										: joined.description}
								</p>
								<span class="warning h-fit rounded px-2 py-1 text-xs font-medium">Member</span>
							</div>
						</a>
					{/each}
				</div>
			{:else}
				<div class="bg-base-200 space-y-4 rounded-xl p-12 text-center">
					<Icon icon="noto-v1:magnifying-glass-tilted-left" class="w-full text-6xl" />
					<h3 class="text-content text-xl font-bold">No Joined Groups</h3>
					<p class="text-neutral">Enter a group code above to join your first group!</p>
				</div>
			{/if}
		</section>
	</div>
>>>>>>> defca4a (added daisyui, replaced buttons removed button component, added winston-loki)
</main>
