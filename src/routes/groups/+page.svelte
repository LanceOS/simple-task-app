<script lang="ts">
	import Button from '$lib/client/components/ui/Button.svelte';
	import Input from '$lib/client/components/ui/Input.svelte';
	import Textarea from '$lib/client/components/ui/Textarea.svelte';
	import { GroupMaker } from '$lib/client/services/GroupMaker.clientutils';
	import Icon from '@iconify/svelte';
	import type { PageProps } from './$types';
	import { onDestroy, onMount } from 'svelte';
	import { Toaster } from '$lib/client/components/toaster/Toaster';
	const { data }: PageProps = $props();
	const { ownedGroups, joinedGroups } = data;

	let createTask: boolean = $state(false);
	let ownedGroupDeleteButton: boolean = $state(false);

	let newGroupDetails: { name: string; description: string } = $state({
		name: '',
		description: ''
	});

	let joinCode: string = $state('');

	let ownedGroupMap: Map<string, boolean> = $state(new Map());

	const selectOwnedGroup = (groupId: string) => {
		const isSelected = ownedGroupMap.get(groupId);

		const newMap = new Map(ownedGroupMap);

		newMap.set(groupId, !isSelected);

		ownedGroupMap = newMap;
		ownedGroupDeleteButton = Array.from(ownedGroupMap.values()).some((value) => value);
	};

	const deleteGroup = async () => {
		const arr: string[] = []
		for(const [key, value] of ownedGroupMap) {
			if(value === true) {
				arr.push(key)
			}
		}

		await GroupMaker.deleteGroup(arr)
	};
</script>

<main class="bg-base-100 min-h-screen px-4 py-24">
	<div class="mx-auto max-w-6xl space-y-12">
		<div class="mb-12 text-center">
			<h1 class="text-content mb-4 text-4xl font-bold">Your Groups</h1>
			<p class="text-neutral text-lg">Manage your owned groups and join new ones</p>
		</div>

		<section class="space-y-6">
			<div class="flex items-center justify-between">
				<div class="flex items-center gap-4">
					<h2 class="text-content text-2xl font-bold">Groups You Own</h2>
					{#if ownedGroupDeleteButton}
						<Button onclick={deleteGroup} aria-label="Delete Groups" variant="danger">Delete Group</Button>
					{/if}
				</div>
				<Button
					type="button"
					aria-label="Create new task group"
					onclick={() => (createTask = !createTask)}
				>
					+ Create New Group
				</Button>
			</div>

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
							<Button
								type="button"
								onclick={async () => await GroupMaker.createGroupCall(newGroupDetails)}
							>
								Create Group
							</Button>
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
				<div class="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
					{#each ownedGroups as owned}
						<div
							class="bg-base-200 relative block rounded-xl p-6 shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
						>
							<div class="mb-4">
								<div class="flex justify-between">
									<Icon icon="noto:busts-in-silhouette" class="info mb-4 rounded-md p-2 text-4xl" />
									<div class="relative">
										<button
											type="button"
											aria-label="Select group"
											class={`h-4 w-4 cursor-pointer border-primary border-2 rounded-full ${ownedGroupMap.get(owned.id) ? 'primary' : ''}`}
											onclick={() => {
												selectOwnedGroup(owned.id);
											}}
										>
											<div></div>
										</button>
									</div>
								</div>
								<h3 class="text-content mb-2 text-xl font-bold">{owned.name}</h3>
								<p class="text-neutral leading-relaxed">{owned.description}</p>
							</div>
							<a
								class="primary h-8 rounded-md px-4 py-2 text-sm font-bold duration-200"
								href={`/groups/${owned.id}`}
								aria-label={`Go to ${owned.name}`}
							>
								View
							</a>
						</div>
					{/each}
				</div>
			{:else}
				<div class="bg-base-200 rounded-xl p-12 text-center">
					<div class="mb-4 text-6xl">📋</div>
					<h3 class="text-content mb-2 text-xl font-bold">No Groups Yet</h3>
					<p class="text-neutral mb-6">
						Create your first group to start collaborating with others!
					</p>
				</div>
			{/if}
		</section>

		<!-- Joined Groups Section -->
		<section class="space-y-6">
			<div class="flex items-center justify-between">
				<h2 class="text-content text-2xl font-bold">Groups You've Joined</h2>
			</div>

			<!-- Join Group Form -->
			<div class="bg-base-200 rounded-xl p-6">
				<h3 class="text-content mb-4 text-lg font-semibold">Join a New Group</h3>
				<form class="flex flex-col">
					<label for="code" class="text-content mb-2 block text-sm font-semibold">Group Code</label>
					<div class="flex flex-1 items-center gap-4">
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
							class="w-32"
							onclick={async () => await GroupMaker.joinGroup(joinCode)}
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
							<div class="mb-4">
								<Icon icon="twemoji:handshake" class="text-3xl" />
								<h3 class="text-content mb-2 text-xl font-bold">{joined.name}</h3>
								<p class="text-neutral leading-relaxed">{joined.description}</p>
							</div>
							<div class="text-neutral flex items-center text-sm">
								<span class="bg-info warning rounded px-2 py-1 text-xs font-medium">Member</span>
							</div>
						</div>
					{/each}
				</div>
			{:else}
				<div class="bg-base-200 rounded-xl p-12 text-center">
					<div class="mb-4 text-6xl">🔍</div>
					<h3 class="text-content mb-2 text-xl font-bold">No Joined Groups</h3>
					<p class="text-neutral">Enter a group code above to join your first group!</p>
				</div>
			{/if}
		</section>
	</div>
</main>
