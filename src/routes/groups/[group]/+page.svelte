<script lang="ts">
	import { page } from '$app/state';
	import { TaskMaker } from '$lib/client/utils/TaskMaker.clientutils';
	import type { PageProps } from './$types';

	const { data }: PageProps = $props();
	const { tasks, groupMembers } = data;

	const groupId = page.params.group;

	let createWindow: boolean = $state(false);

	const newTask = $state({
		name: '',
		description: '',
		groupId: groupId
	});

	const createTask = async () => {
		TaskMaker.createTask(newTask);
	};
</script>

<main class="space-y-8">
	<section class="space-y-2">
		{#if tasks.length > 0}
			<h1>Your Tasks</h1>
			<div class="flex gap-4">
				{#each tasks as task}
					<div>
						<a href={`/groups/group/${groupId}/task/${task.id}`} class="flex gap-2 items-center">
                            <div>

                                <h2>{task.taskName}</h2>
                                <p>{task.description}</p>
                            </div>
                            <div>
                                <p>{task.completed}</p>
                                <p>{task.createdAt.toLocaleDateString()}</p>
                            </div>
						</a>
					</div>
				{/each}
				<button
					type="button"
					class="cursor-pointer rounded-md border px-4 py-2"
					onclick={() => (createWindow = !createWindow)}>Create Task</button
				>
			</div>
		{:else}
			<h2>You have no tasks!</h2>
			<p>Get started by creating a new one!</p>
			<button
				type="button"
				class="cursor-pointer rounded-md border px-4 py-2"
				onclick={() => (createWindow = !createWindow)}>Create Task</button
			>
		{/if}
	</section>
	{#if createWindow}
		<form class="space-y-2">
			<h1>Create New Task</h1>
			<div>
				<label for="taskName">Task Name:</label>
				<input type="text" name="taskName" id="taskName" class="border" bind:value={newTask.name} />
			</div>
			<div>
				<label for="taskDisc">Task Description:</label>
				<input
					type="text"
					name="taskDisc"
					id="taskDisc"
					class="border"
					bind:value={newTask.description}
				/>
			</div>
			<button type="button" class="cursor-pointer rounded-md border px-4 py-2" onclick={createTask}
				>Confirm</button
			>
		</form>
	{/if}
	<section class="space-y-2">
		<h1>Members</h1>
		<div>
			{#each groupMembers as member}
				<div>
					<h2>{member.user.name}</h2>
				</div>
			{/each}
		</div>
	</section>
</main>
