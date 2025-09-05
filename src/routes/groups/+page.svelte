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

<main class="bg-base-100 mx-auto min-h-screen max-w-7xl space-y-8 px-4 py-24">
	<section class="space-y-4 p-12 text-center">
		<Icon icon="unjs:db0" class="mx-auto text-6xl" />
		<h1 class="text-3xl font-bold">Group Dashboard</h1>
		<p class="text-lg">Manage your owned and joined groups in one place!</p>
	</section>
	<!-- Owned Groups Header -->
	<section class="space-y-6">
		<div class="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
			<h2 class="text-content text-2xl font-bold">Groups You Own</h2>
			<div class="flex flex-wrap items-center gap-3">
				<button
					type="button"
					aria-label="Create new task group"
					onclick={() => (createTask = !createTask)}
					class="btn btn-primary"
				>
					+ Create New Group
				</button>
				<a href="/manage_groups" class="btn btn-secondary">Manage Groups</a>
			</div>
		</div>

		<!-- Create Group Form -->
		{#if createTask}
			<div class="bg-base-200 rounded-xl p-6 shadow-lg sm:p-8">
				<h3 class="text-content mb-6 text-xl font-bold sm:text-2xl">Create New Task Group</h3>
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
					<div class="flex gap-3">
						<button
							type="button"
							class="btn btn-primary"
							onclick={createGroup}
							disabled={disableActionButtons}
						>
							Create Group
						</button>
						<button type="button" class="btn btn-error" onclick={() => (createTask = false)}>
							Cancel
						</button>
					</div>
				</form>
			</div>
		{/if}

		<!-- Owned Groups Display -->
		{#if ownedGroups.length > 0}
			<div class="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
				{#each ownedGroups as owned}
					<a
						href={`/groups/${owned.id}`}
						class="bg-base-200 flex flex-col gap-3 rounded-xl p-6 shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
					>
						<Icon icon="noto:busts-in-silhouette" class="bg-info rounded-lg p-2 text-4xl" />
						<h3 class="text-content text-lg font-bold sm:text-xl">{owned.name}</h3>
						<p class="text-neutral leading-relaxed">
							{owned.description.length > 60
								? `${owned.description.slice(0, 60)}...`
								: owned.description}
						</p>
						<span class="badge badge-success w-fit">Owner</span>
					</a>
				{/each}
			</div>
		{:else}
			<div class="bg-base-200 space-y-4 rounded-xl p-12 text-center shadow-md">
				<Icon icon="noto:clipboard" class="mx-auto text-6xl" />
				<h3 class="text-content text-xl font-bold">No Groups Yet</h3>
				<p class="text-neutral">Create your first group to start collaborating with others!</p>
			</div>
		{/if}
	</section>

	<!-- Joined Groups Section -->
	<section class="space-y-6">
		<h2 class="text-content text-2xl font-bold">Groups You've Joined</h2>

		<!-- Join Group Form -->
		<div class="bg-base-200 rounded-xl p-6 shadow-md">
			<h3 class="text-content mb-4 text-lg font-semibold">Join a New Group</h3>
			<form class="flex flex-col gap-4 sm:flex-row sm:items-center">
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
					class="btn btn-primary w-full sm:w-auto"
					disabled={disableActionButtons}
					onclick={joinGroup}
				>
					Join Group
				</button>
			</form>
		</div>

		<!-- Joined Groups Display -->
		{#if joinedGroups && joinedGroups.length > 0}
			<div class="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
				{#each joinedGroups as joined}
					<a
						href={`/groups/${joined.id}`}
						class="bg-base-200 flex flex-col gap-3 rounded-xl p-6 shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
					>
						<Icon icon="twemoji:handshake" class="text-4xl" />
						<h3 class="text-content text-lg font-bold sm:text-xl">{joined.name}</h3>
						<p class="text-neutral leading-relaxed">
							{joined.description.length > 60
								? `${joined.description.slice(0, 60)}...`
								: joined.description}
						</p>
						<span class="badge badge-warning w-fit">Member</span>
					</a>
				{/each}
			</div>
		{:else}
			<div class="bg-base-200 space-y-4 rounded-xl p-12 text-center shadow-md">
				<Icon icon="noto-v1:magnifying-glass-tilted-left" class="mx-auto text-6xl" />
				<h3 class="text-content text-xl font-bold">No Joined Groups</h3>
				<p class="text-neutral">Enter a group code above to join your first group!</p>
			</div>
		{/if}
	</section>
</main>
