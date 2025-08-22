<script lang="ts">
	import type { PageProps } from './$types';

	const { data }: PageProps = $props();
	const { task, assignees, groupMembers, isUserAdmin } = data;
</script>

<main>
	<section>
		{#if task}
			<h1>{task.taskName}</h1>
		{/if}
	</section>
	<section>
		{#if assignees}
			{#each assignees as assignee}
				<h2>{assignee.assignee.name}</h2>
				<p>Date Assigned: {assignee.createdAt.toLocaleDateString()}</p>
			{/each}
		{:else}
			<h2>No groups members are assigned to this task!</h2>
		{/if}
	</section>
	{#if isUserAdmin}
		<section>
			<h2>Assign members to this task!</h2>
			<p>Group Members:</p>
			{#if groupMembers}
				{#each groupMembers as member}
					<div>
						<p>{member.user.name}</p>
					</div>
				{/each}
			{/if}
		</section>
	{/if}
</main>
