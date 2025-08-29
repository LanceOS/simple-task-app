<script lang="ts">
	import { page } from '$app/state';
	import Button from '$lib/client/components/ui/Button.svelte';
	import Input from '$lib/client/components/ui/Input.svelte';
	import Textarea from '$lib/client/components/ui/Textarea.svelte';
	import { Inviter } from '$lib/client/services/Inviter.clientutil';
	import { TaskMaker } from '$lib/client/services/TaskMaker.clientutils';
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

	let inviteeEmail: string = $state('')

	const createTask = async () => {
		await TaskMaker.createTask(newTask);
	};

	const addMember = async () => {
		await Inviter.sendUserInvite(groupId, inviteeEmail)
	}
</script>

<main class="min-h-screen bg-base-100 px-4 py-24">
	<div class="mx-auto max-w-7xl space-y-12">
		<!-- Header -->
		<div class="text-center mb-12">
			<h1 class="text-4xl font-bold text-content mb-4">Group Dashboard</h1>
			<p class="text-lg text-neutral">Manage tasks and collaborate with your team</p>
		</div>

		<!-- Tasks Section -->
		<section class="space-y-6">
			<div class="flex items-center justify-between">
				<h2 class="text-2xl font-bold text-content">Tasks</h2>
				<Button
					type="button"
					onclick={() => (createWindow = !createWindow)}
				>
					+ Create New Task
				</Button>
			</div>

			{#if tasks.length > 0}
				<div class="grid gap-6 lg:grid-cols-2 xl:grid-cols-3">
					{#each tasks as task}
						<a 
							href={`/groups/${groupId}/task/${task.id}`}
							class="bg-base-200 rounded-xl p-6 shadow-md transition-all duration-300 hover:shadow-xl hover:-translate-y-1 block"
						>
							<div class="flex items-start justify-between mb-4">
								<div class="flex-1">
									<h3 class="text-xl font-bold text-content mb-2 line-clamp-2">{task.taskName}</h3>
									<p class="text-neutral leading-relaxed mb-4 line-clamp-3">{task.description}</p>
								</div>
								<div class="ml-4 flex-shrink-0">
									{#if task.completed}
										<div class="success w-3 h-3 rounded-full"></div>
									{:else}
										<div class="warning w-3 h-3 rounded-full"></div>
									{/if}
								</div>
							</div>
							
							<div class="flex items-center justify-between">
								<span class={task.completed ? "success px-3 py-1 rounded-full text-xs font-medium" : "warning px-3 py-1 rounded-full text-xs font-medium"}>
									{task.completed ? "Completed" : "In Progress"}
								</span>
								<span class="text-sm text-neutral">
									{task.createdAt.toLocaleDateString()}
								</span>
							</div>
						</a>
					{/each}
				</div>
			{:else}
				<div class="bg-base-200 rounded-xl p-12 text-center">
					<div class="text-6xl mb-4">📝</div>
					<h3 class="text-xl font-bold text-content mb-2">No Tasks Yet</h3>
					<p class="text-neutral mb-6">Get started by creating your first task!</p>
				</div>
			{/if}
		</section>

		<!-- Create Task Form -->
		{#if createWindow}
			<section class="bg-base-200 rounded-xl p-8 shadow-lg">
				<h3 class="text-2xl font-bold text-content mb-6">Create New Task</h3>
				<form class="space-y-6">
					<Input bind:input={newTask.name} title={"Task Name:"} type="text" placeholder="Name your task..."/>
					<Textarea title="Task Description:" placeholder="Describe your task..." rows={4}/>
					<div class="flex gap-4">
						<Button
							type="button"
							onclick={createTask}
						>
							Create Task
						</Button>
						<Button
							variant="neutral"
							type="button"
							onclick={() => (createWindow = false)}
						>
							Cancel
						</Button>
					</div>
				</form>
			</section>
		{/if}

		<div class="grid gap-12 lg:grid-cols-2">
			<!-- Add Members Section -->
			<section class="space-y-6">
				<h2 class="text-2xl font-bold text-content">Invite Members</h2>
				<div class="bg-base-200 rounded-xl p-6">
					<form class="space-y-4">
						<div>
							<label for="addMem" class="block text-sm font-semibold text-content mb-2">Email Address</label>
							<div class="flex gap-3">
								<input
									type="email"
									name="addMem"
									id="addMem"
									class="flex-1 px-4 py-3 bg-base-100 border border-base-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-content"
									placeholder="example@gmail.com"
									bind:value={inviteeEmail}
								/>
								<button 
									type="button" 
									class="secondary px-6 py-3 rounded-lg font-semibold transition-all duration-200 whitespace-nowrap"
									onclick={addMember}
								>
									Send Invite
								</button>
							</div>
						</div>
					</form>
				</div>
			</section>

			<!-- Members Section -->
			<section class="space-y-6">
				<h2 class="text-2xl font-bold text-content">Members ({groupMembers.length})</h2>
				<div class="bg-base-200 rounded-xl p-6">
					{#if groupMembers.length > 0}
						<div class="space-y-4">
							{#each groupMembers as member}
								<div class="flex items-center gap-4 p-4 bg-base-100 rounded-lg">
									<div class="w-10 h-10 bg-primary rounded-full flex items-center justify-center text-lg">
										👤
									</div>
									<div class="flex-1">
										<h3 class="font-semibold text-content">{member.user.name}</h3>
										<p class="text-sm text-neutral">Joined {member.createdAt.toLocaleDateString()}</p>
									</div>
									<div class="info px-3 py-1 rounded-full text-xs font-medium">
										Member
									</div>
								</div>
							{/each}
						</div>
					{:else}
						<div class="text-center py-8">
							<div class="text-4xl mb-4">👥</div>
							<h3 class="text-lg font-semibold text-content mb-2">No Members Yet</h3>
							<p class="text-neutral">Invite people to start collaborating!</p>
						</div>
					{/if}
				</div>
			</section>
		</div>
	</div>
</main>