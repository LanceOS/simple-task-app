<script lang="ts">
	import type { PageProps } from './$types';

	const { data }: PageProps = $props();
	const { tasks, groupMembers } = data;

	let create: boolean = $state(false);
</script>

<main class="space-y-8">
	<section class="space-y-2">
		{#if tasks.length > 0}
			<h1>Your Tasks</h1>
			<div>
				{#each tasks as task}
					<div>
						<h2>{task.taskName}</h2>
						<p>{task.description}</p>
						<p>{task.completed}</p>
						<p>{task.createdAt}</p>
					</div>
				{/each}
			</div>
		{:else}
			<h1>You have no tasks!</h1>
			<p>Get started by creating a new one!</p>
			<button type="button" class="cursor-pointer rounded-md border px-4 py-2">Create Task</button>
		{/if}
	</section>
	<form class="space-y-2">
		<h1>Create New Task</h1>
		<div>
			<label for="taskName">Task Name:</label>
			<input type="text" name="taskName" id="taskName" class="border" />
		</div>
		<div>
			<label for="taskDisc">Task Description:</label>
			<input type="text" name="taskDisc" id="taskDisc" class="border" />
		</div>
		<button type="button" class="cursor-pointer rounded-md border px-4 py-2" onclick={}>Confirm</button>
	</form>
	<section class="space-y-2">
		<h1>Members</h1>
		<div>
			{#each groupMembers as member}
				<div>
					<h2>{member.name}</h2>
				</div>
			{/each}
		</div>
	</section>
</main>
