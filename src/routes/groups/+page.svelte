<script lang="ts">
	import Button from '$lib/client/components/ui/Button.svelte';
	import Input from '$lib/client/components/ui/Input.svelte';
	import Textarea from '$lib/client/components/ui/Textarea.svelte';
	import Icon from '@iconify/svelte';
	import { GroupClient } from '$lib/client/services/GroupClient.clientutil';
	import type { PageProps } from './$types';
	import { authClient } from '$lib/auth-client';
	import { Toaster } from '$lib/client/components/toaster/Toaster';
	import type { IGroups } from '$lib/server/schemas/task_group.schema';

	const { data }: PageProps = $props();
	let ownedGroups: IGroups[] = $state(data.ownedGroups);
	let joinedGroups = $state(data.joinedGroups);

	const session = authClient.useSession();
	const user = $session.data?.user;

	let createTask: boolean = $state(false);
	let ownedGroupDeleteButtonVisible: boolean = $state(false);
	let joinedGroupLeaveButtonVisible: boolean = $state(false);
	let disableActionButtons: boolean = $state(false);

	let newGroupDetails: { name: string; description: string } = $state({
		name: '',
		description: ''
	});

	let joinCode: string = $state('');

	let ownedGroupMap: Map<string, boolean> = $state(new Map());
	let joinedGroupMap: Map<string, boolean> = $state(new Map());

	// In this function the a new map is being created and then being assigned tot he original map. This is to trigger svelt's reactivity.
	const selectOwnedGroup = (groupId: string) => {
		const isSelected = ownedGroupMap.get(groupId);
		const newMap = new Map(ownedGroupMap);
		newMap.set(groupId, !isSelected);
		ownedGroupMap = newMap;
		ownedGroupDeleteButtonVisible = Array.from(ownedGroupMap.values()).some((value) => value);
	};

	const selectJoinedGroup = (groupId: string) => {
		const isSelected = joinedGroupMap.get(groupId);
		const newMap = new Map(joinedGroupMap);
		newMap.set(groupId, !isSelected);
		joinedGroupMap = newMap;
		joinedGroupLeaveButtonVisible = Array.from(joinedGroupMap.values()).some((value) => value);
		console.log(joinedGroupMap)
	};

	/**
	 * Loops through the currently saved ids in the ownedGroupsMap
	 * if a saved group is marked "true" for deletion then it's id is
	 * saved in an array. Then the array is passed to the delete group endpoint.
	 */
	const deleteGroup = async () => {
		if (!user) {
			Toaster.ejectToast({
				message: 'Must be signed in to delete posts!',
				type: 'info'
			});
			return;
		}
		disableActionButtons = true;
		const arr: string[] = [];
		for (const [key, value] of ownedGroupMap) {
			const [group] = ownedGroups.filter((group) => group.id === key);
			if (value === true && group.ownerId === user?.id) {
				arr.push(key);
			}
		}
		ownedGroups = ownedGroups.filter((group) => !arr.includes(group.id));

		await GroupClient.deleteGroup(arr);
		ownedGroupMap.clear();
		ownedGroupDeleteButtonVisible = false;
		disableActionButtons = false;
	};

	const leaveJoinedGroup = async () => {
		if(!user) {
			Toaster.ejectToast({
				message: "Must be signed in to leave a group!",
				type: "info"
			})
			return;
		}
		disableActionButtons = true;
		const arr: string[] = [];
		for (const [key, value] of joinedGroupMap) {
			if (value === true) {
				arr.push(key);
			}
		}
		joinedGroups = joinedGroups.filter((group) => !arr.includes(group.id));
		await GroupClient.leaveGroup(arr);
		joinedGroupMap.clear();
		joinedGroupLeaveButtonVisible = false;
		disableActionButtons = false;

	};

	const createGroup = async () => {
		if (!user) {
			Toaster.ejectToast({
				message: 'Must be signed in to create a group!',
				type: 'error'
			});
		}
		await GroupClient.createGroup(newGroupDetails);
	};
</script>

<main class="bg-base-100 min-h-screen px-4 py-24">
	<div class="mx-auto max-w-6xl space-y-12">
		<div class="mb-12 text-center">
			<h1 class="text-content mb-4 text-4xl font-bold">Your Groups</h1>
			<p class="text-neutral text-lg">Manage your owned groups and join new ones</p>
		</div>

		<div class="space-y-6">
			<section class="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
				<div class="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-4">
					<h2 class="text-content text-2xl font-bold">Groups You Own</h2>
					<Button
						type="button"
						aria-label="Create new task group"
						onclick={() => (createTask = !createTask)}
					>
						+ Create New Group
					</Button>
					{#if ownedGroupDeleteButtonVisible}
						<Button
							onclick={deleteGroup}
							disabled={disableActionButtons}
							aria-label="Delete Groups"
							variant="danger"
						>
							Delete Group
						</Button>
					{/if}
				</div>
			</section>

			{#if createTask}
				<section class="bg-base-200 rounded-xl p-8 shadow-lg">
					<h3 class="text-content mb-6 text-2xl font-bold">Create New Task Group</h3>
					<form class="space-y-6">
						<Input
							title="Name"
							type="text"
							placeholder="Enter group name..."
							bind:input={newGroupDetails.name}
						/>
						<Textarea
							title="Group Description"
							rows={3}
							bind:input={newGroupDetails.description}
							placeholder="Describe your group's purpose..."
						/>
						<div class="flex gap-4">
							<Button type="button" onclick={createGroup} disabled={disableActionButtons}
								>Create Group</Button
							>
							<Button
								type="button"
								variant="neutral"
								aria-label="Select group"
								onclick={() => (createTask = false)}
							>
								Cancel
							</Button>
						</div>
					</form>
				</section>
			{/if}
			{#if ownedGroups.length > 0}
				<section class="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
					{#each ownedGroups as owned}
						<div
							class="bg-base-200 relative block rounded-xl p-6 shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
						>
							<div class="mb-4">
								<Icon icon="noto:busts-in-silhouette" class="info mb-4 rounded-md p-2 text-4xl" />
								<h3 class="text-content mb-2 text-xl font-bold">{owned.name}</h3>
								<p class="text-neutral leading-relaxed">{owned.description}</p>
							</div>
							<div class="flex items-center gap-2">
								<button
									type="button"
									aria-label="Select group"
									class={`h-full cursor-pointer rounded-md px-4 py-2 text-sm font-bold duration-200
 								${ownedGroupMap.get(owned.id) ? 'danger' : 'btn-warning'}`}
									onclick={() => {
										selectOwnedGroup(owned.id);
									}}
								>
									{ownedGroupMap.get(owned.id) ? 'Selected' : 'Select'}
								</button>
								<a
									class="primary h-full rounded-md px-4 py-2 text-sm font-bold duration-200"
									href={`/groups/${owned.id}`}
									aria-label={`Go to ${owned.name}`}
								>
									View
								</a>
							</div>
						</div>
					{/each}
				</section>
			{:else}
				<div class="bg-base-200 rounded-xl p-12 text-center">
					<div class="mb-4 text-6xl">📋</div>
					<h3 class="text-content mb-2 text-xl font-bold">No Groups Yet</h3>
					<p class="text-neutral mb-6">
						Create your first group to start collaborating with others!
					</p>
				</div>
			{/if}
		</div>

		<!-- Joined Groups Section -->
		<section class="space-y-6">
			<div class="flex items-center gap-4 h-8">
				<h2 class="text-content text-2xl font-bold">Groups You've Joined</h2>
				{#if joinedGroupLeaveButtonVisible}
					<Button
						onclick={leaveJoinedGroup}
						disabled={disableActionButtons}
						aria-label="Leave Groups"
						variant="danger"
					>
						Leave Group
					</Button>
				{/if}
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
						<Button
							type="button"
							variant="secondary"
							class="w-full sm:w-32"
							disabled={disableActionButtons}
							onclick={async () => await GroupClient.joinGroup(joinCode)}
						>
							Join Group
						</Button>
					</div>
				</form>
			</div>

			<!-- Joined Groups Display -->
			{#if joinedGroups && joinedGroups.length > 0}
				<div class="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
					{#each joinedGroups as joined}
						<div
							class="bg-base-200 rounded-xl p-6 shadow-md transition-all duration-300 hover:shadow-xl"
						>
							<div class="space-y-4">
								<div class="flex items-center justify-between">
									<Icon icon="twemoji:handshake" class="text-4xl" />
									<span class="warning h-fit rounded px-2 py-1 text-xs font-medium">Member</span>
								</div>

								<div>
									<h3 class="text-content text-xl font-bold">{joined.name}</h3>
									<p class="text-neutral leading-relaxed">{joined.description}</p>
								</div>

								<div class="flex items-center gap-2">
									<button
										type="button"
										aria-label="Select group"
										class={`h-full cursor-pointer rounded-md px-4 py-2 text-sm font-bold duration-200
 										${joinedGroupMap.get(joined.id) ? 'danger' : 'btn-warning'}`}
										onclick={() => {
											selectJoinedGroup(joined.id);
										}}
									>
										{joinedGroupMap.get(joined.id) ? 'Selected' : 'Select'}
									</button>
									<a
										class="primary h-full rounded-md px-4 py-2 text-sm font-bold duration-200"
										href={`/groups/${joined.id}`}
										aria-label={`Go to ${joined.name}`}
									>
										View
									</a>
								</div>
							</div>
						</div>
					{/each}
				</div>
			{:else}
				<div class="bg-base-200 rounded-xl p-12 text-center">
					<Icon icon="noto-v1:magnifying-glass-tilted-left" class="mb-6 text-6xl" />
					<h3 class="text-content mb-2 text-xl font-bold">No Joined Groups</h3>
					<p class="text-neutral">Enter a group code above to join your first group!</p>
				</div>
			{/if}
		</section>
	</div>
</main>
