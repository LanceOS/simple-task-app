<script lang="ts">
	import Button from '$lib/client/components/ui/Button.svelte';
	import Input from '$lib/client/components/ui/Input.svelte';
	import { GroupMaker } from '$lib/client/services/GroupMaker.clientutils';
	import type { PageProps } from './$types';
	const { data }: PageProps = $props();
	const { ownedGroups, joinedGroups } = data;

	let createTask: boolean = $state(false);

	let newGroupDetails: { name: string; description: string } = $state({
		name: '',
		description: ''
	});

	let joinCode: string = $state('');
</script>

<main class="bg-base-100 min-h-screen px-4 py-24">
	<div class="mx-auto max-w-6xl space-y-12">
		<div class="mb-12 text-center">
			<h1 class="text-content mb-4 text-4xl font-bold">Your Groups</h1>
			<p class="text-neutral text-lg">Manage your owned groups and join new ones</p>
		</div>

		<section class="space-y-6">
			<div class="flex items-center justify-between">
				<h2 class="text-content text-2xl font-bold">Groups You Own</h2>
				<button
					type="button"
					aria-label="Create new task group"
					class="primary rounded-lg px-6 py-3 font-semibold transition-all duration-200 hover:shadow-lg"
					onclick={() => (createTask = !createTask)}
				>
					+ Create New Group
				</button>
			</div>

			{#if createTask}
				<section class="bg-base-200 rounded-xl p-8 shadow-lg">
					<h3 class="text-content mb-6 text-2xl font-bold">Create New Task Group</h3>
					<form class="space-y-6">
						<Input
							title={'Name:'}
							type="text"
							placeholder="Enter group name..."
							bind:input={newGroupDetails.name}
						/>
						<div>
							<label for="groupDisc" class="text-content mb-2 block text-sm font-semibold"
								>Group Description</label
							>
							<textarea
								name="groupDisc"
								id="groupDisc"
								rows="3"
								class="bg-base-100 border-base-300 focus:ring-primary text-content w-full resize-none rounded-lg border px-4 py-3 focus:ring-2 focus:outline-none"
								placeholder="Describe your group's purpose..."
								bind:value={newGroupDetails.description}
							></textarea>
						</div>
						<div class="flex gap-4">
							<button
								type="button"
								class="primary rounded-lg px-6 py-3 font-semibold transition-all duration-200"
								onclick={async () => await GroupMaker.createGroupCall(newGroupDetails)}
							>
								Create Group
							</button>
							<button
								type="button"
								class="neutral rounded-lg px-6 py-3 font-semibold transition-all duration-200"
								onclick={() => (createTask = false)}
							>
								Cancel
							</button>
						</div>
					</form>
				</section>
			{/if}
			{#if ownedGroups.length > 0}
				<div class="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
					{#each ownedGroups as owned}
						<a
							href={`/groups/${owned.id}`}
							aria-label={`Go to ${owned.name}`}
							class="bg-base-200 block rounded-xl p-6 shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
						>
							<div class="mb-4">
								<div
									class="bg-primary mb-3 flex h-12 w-12 items-center justify-center rounded-lg text-2xl"
								>
									👥
								</div>
								<h3 class="text-content mb-2 text-xl font-bold">{owned.name}</h3>
								<p class="text-neutral leading-relaxed">{owned.description}</p>
							</div>
							<div class="text-neutral flex items-center text-sm">
								<span class="bg-success rounded px-2 py-1 text-xs font-medium">Owner</span>
							</div>
						</a>
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
				<form class="flex items-end gap-4">
					<div class="flex-1">
						<label for="code" class="text-content mb-2 block text-sm font-semibold"
							>Group Code</label
						>
						<input
							type="text"
							name="code"
							id="code"
							bind:value={joinCode}
							class="bg-base-100 border-base-300 focus:ring-primary text-content w-full rounded-lg border px-4 py-3 focus:ring-2 focus:outline-none"
							placeholder="Enter group code..."
						/>
					</div>
					<Button
						type="button"
						class="secondary rounded-lg px-6 py-3 font-semibold transition-all duration-200"
						onclick={async () => await GroupMaker.joinGroup(joinCode)}
					>
						Join Group
					</Button>
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
								<div
									class="bg-secondary mb-3 flex h-12 w-12 items-center justify-center rounded-lg text-2xl"
								>
									🤝
								</div>
								<h3 class="text-content mb-2 text-xl font-bold">{joined.name}</h3>
								<p class="text-neutral leading-relaxed">{joined.description}</p>
							</div>
							<div class="text-neutral flex items-center text-sm">
								<span class="bg-info rounded px-2 py-1 text-xs font-medium">Member</span>
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
