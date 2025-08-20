<script lang="ts">
	import { GroupMaker } from '$lib/client/utils/GroupMaker.clientutils';
	import type { PageData } from './$types';
	const { ownedGroups, joinedGroups }: PageData = $props();

	let createTask: boolean = $state(false);

	const newGroupDetails = {
		name: '',
		description: ''
	};
</script>

<main class="relative space-y-8">
	<section class="space-y-2">
		<h1>Your Groups</h1>
		{#if ownedGroups}
			{#each ownedGroups as owned}
				<div>
					<h2>{owned.groupName}</h2>
					<p>{owned.description}</p>
				</div>
			{/each}
		{:else}
			<div class="space-y-4">
				<h2>You do not have any groups!</h2>
				<button
					type="button"
					aria-label="Create new task group"
					class="cursor-pointer rounded-md border px-4 py-2"
					onclick={() => (createTask = !createTask)}
					>Create Task Group
				</button>
			</div>
		{/if}
	</section>
	{#if createTask}
		<form class="space-y-2">
			<h3>Create New Task Group</h3>
			<div>
				<label for="groupName">Group Name:</label>
				<input
					type="text"
					name="groupName"
					id="groupName"
					class="border"
					bind:value={newGroupDetails.name}
				/>
			</div>
			<div>
				<label for="groupDisc">Group Name:</label>
				<input
					type="text"
					name="groupDisc"
					id="groupDisc"
					class="border"
					bind:value={newGroupDetails.description}
				/>
			</div>
			<button
				type="button"
				class="cursor-pointer rounded-md border px-4 py-2"
				onclick={async () => await GroupMaker.createGroupCall(newGroupDetails)}>Confirm</button
			>
		</form>
	{/if}
	<section>
		<h1>Joined Groups</h1>
		<div>
			{#if joinedGroups}
				{#each joinedGroups as joined}
					<div>
						<h2>{joined.groupName}</h2>
						<p>{joined.description}</p>
					</div>
				{/each}
			{:else}
				<div>
					<h2>You are not part of groups.</h2>
				</div>
			{/if}
		</div>
	</section>
</main>
