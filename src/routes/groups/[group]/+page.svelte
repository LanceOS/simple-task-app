<script lang="ts">
	import { page } from '$app/state';
	import Button from '$lib/client/components/ui/Button.svelte';
	import Input from '$lib/client/components/ui/Input.svelte';
	import Textarea from '$lib/client/components/ui/Textarea.svelte';
	import { Inviter } from '$lib/client/services/Inviter.clientutil';
	import { TaskMaker } from '$lib/client/services/TaskMaker.clientutils';
	import Icon from '@iconify/svelte';
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

	let inviteeEmail: string = $state('');

	const createTask = async () => {
		await TaskMaker.createTask(newTask);
	};

	const addMember = async () => {
		await Inviter.sendUserInvite(groupId, inviteeEmail);
	};
</script>

<main class="bg-base-100 min-h-screen px-4 py-24">
	<div class="mx-auto max-w-7xl space-y-12">
		<!-- Header -->
		<div class="mb-12 text-center">
			<h1 class="text-content mb-4 text-4xl font-bold">Group Dashboard</h1>
			<p class="text-neutral text-lg">Manage tasks and collaborate with your team</p>
		</div>

		<!-- Tasks Section -->
		<section class="space-y-6">
			<div class="flex items-center justify-between">
				<div class="flex items-center gap-2">
					<Button type="button" variant="custom" aria-label="Return to groups." class="rounded-lg hidden sm:flex cursor-pointer h-full p-2 neutral" onclick={() => history.back()}>
						<Icon icon="grommet-icons:return"/>
					</Button>
					<h2 class="text-content text-2xl font-bold">Tasks</h2>
				</div>
				<Button type="button" onclick={() => (createWindow = !createWindow)}>
					+ Create New Task
				</Button>
			</div>

			{#if tasks.length > 0}
				<div class="grid gap-6 lg:grid-cols-2 xl:grid-cols-3">
					{#each tasks as task}
						<a
							href={`/groups/${groupId}/task/${task.id}`}
							class="bg-base-200 block rounded-xl p-6 shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
						>
							<div class="mb-4 flex items-start justify-between">
								<div class="flex-1">
									<h3 class="text-content mb-2 line-clamp-2 text-xl font-bold">{task.taskName}</h3>
									<p class="text-neutral mb-4 line-clamp-3 leading-relaxed">{task.description}</p>
								</div>
								<div class="ml-4 flex-shrink-0">
									{#if task.completed}
										<div class="success h-3 w-3 rounded-full"></div>
									{:else}
										<div class="warning h-3 w-3 rounded-full"></div>
									{/if}
								</div>
							</div>

							<div class="flex items-center justify-between">
								<span
									class={task.completed
										? 'success rounded-full px-3 py-1 text-xs font-medium'
										: 'warning rounded-full px-3 py-1 text-xs font-medium'}
								>
									{task.completed ? 'Completed' : 'In Progress'}
								</span>
								<span class="text-neutral text-sm">
									{task.createdAt.toLocaleDateString()}
								</span>
							</div>
						</a>
					{/each}
				</div>
			{:else}
				<div class="bg-base-200 rounded-xl p-12 text-center">
					<Icon icon="noto:writing-hand" class="text-7xl w-full mb-4"/>
					<h3 class="text-content mb-2 text-xl font-bold">No Tasks Yet</h3>
					<p class="text-neutral mb-6">Get started by creating your first task!</p>
				</div>
			{/if}
		</section>

		<!-- Create Task Form -->
		{#if createWindow}
			<section class="bg-base-200 rounded-xl p-8 shadow-lg">
				<h3 class="text-content mb-6 text-2xl font-bold">Create New Task</h3>
				<form class="space-y-6">
					<Input
						bind:input={newTask.name}
						title="Task Name"
						type="text"
						placeholder="Name your task..."
					/>
					<Textarea
						title="Task Description"
						placeholder="Describe your task..."
						rows={4}
						bind:input={newTask.description}
					/>
					<div class="flex gap-4">
						<Button type="button" onclick={createTask}>Create Task</Button>
						<Button variant="neutral" type="button" onclick={() => (createWindow = false)}>
							Cancel
						</Button>
					</div>
				</form>
			</section>
		{/if}

		<section class="space-y-6">
			<h2 class="text-content text-2xl font-bold">Invite Members</h2>
			<div class="bg-base-200 h-fit rounded-xl p-6">
				<form class="space-y-4">
					<div>
						<label for="addMem" class="text-content mb-2 block text-sm font-semibold"
							>Email Address</label
						>
						<div class="flex gap-3">
							<input
								type="email"
								name="addMem"
								id="addMem"
								class="bg-base-100 border-base-300 focus:ring-primary text-content flex-1 rounded-lg border px-4 py-3 focus:ring-2 focus:outline-none"
								placeholder="example@gmail.com"
								bind:value={inviteeEmail}
							/>
							<Button type="button" variant="secondary" onclick={addMember}>Send Invite</Button>
						</div>
					</div>
				</form>
			</div>
		</section>

		<!-- Members Section -->
		<section class="space-y-4">
			<h2 class="text-content text-2xl font-bold">Members ({groupMembers.length})</h2>
			<div class="bg-base-200 flex flex-col rounded-xl p-6 sm:flex-row sm:flex-wrap">
				{#if groupMembers.length > 0}
					<div class="space-y-4">
						{#each groupMembers as member}
							<div class="bg-base-100 flex items-center gap-4 rounded-lg p-4">
								<Icon icon="noto:bust-in-silhouette" class="text-4xl info p-2 rounded-md"/>
								<div class="flex-1">
									<h3 class="text-content font-semibold">{member.user.name}</h3>
									<p class="text-neutral text-sm">Joined {member.createdAt.toLocaleDateString()}</p>
								</div>
								<div class="info rounded-full px-3 py-1 text-xs font-medium">Member</div>
							</div>
						{/each}
					</div>
				{:else}
					<div class="py-8 text-center">
						<div class="mb-4 text-4xl">👥</div>
						<h3 class="text-content mb-2 text-lg font-semibold">No Members Yet</h3>
						<p class="text-neutral">Invite people to start collaborating!</p>
					</div>
				{/if}
			</div>
		</section>
	</div>
</main>
