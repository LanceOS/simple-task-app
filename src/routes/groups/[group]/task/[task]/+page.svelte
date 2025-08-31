<script lang="ts">
	import type { PageProps } from './$types';
	import Button from '$lib/client/components/ui/Button.svelte';
	import Icon from '@iconify/svelte';

	const { data }: PageProps = $props();
	const { task, assignees, groupMembers, isUserAdmin } = data;
</script>

<main class="bg-base-100 min-h-screen px-4 py-24">
	<div class="mx-auto max-w-7xl space-y-12">
		<!-- Task Header -->
		{#if task}
			<section class="text-center space-y-4">
				<h1 class="text-content text-4xl font-bold">{task.taskName}</h1>
				<p class="text-neutral max-w-2xl mx-auto leading-relaxed">
					{task.description || 'No description provided for this task.'}
				</p>
			</section>
		{/if}

		<!-- Assignees Section -->
		<section class="space-y-6">
			<h2 class="text-content text-2xl font-bold">Assignees</h2>
			<div class="bg-base-200 rounded-xl p-6 shadow-md">
				{#if assignees && assignees.length > 0}
					<div class="space-y-4">
						{#each assignees as assignee}
							<div class="bg-base-100 flex items-center gap-4 rounded-lg p-4">
								<Icon icon="noto:bust-in-silhouette" class="info rounded-md p-2 text-4xl" />
								<div class="flex-1">
									<h3 class="text-content font-semibold">{assignee.assignee.name}</h3>
									<p class="text-neutral text-sm">
										Assigned {assignee.createdAt.toLocaleDateString()}
									</p>
								</div>
								<div class="success rounded-full px-3 py-1 text-xs font-medium">Assigned</div>
							</div>
						{/each}
					</div>
				{:else}
					<div class="text-center py-8">
						<Icon icon="noto:warning" class="mb-4 mx-auto text-5xl text-neutral" />
						<h3 class="text-content mb-2 text-lg font-semibold">No Assignees</h3>
						<p class="text-neutral">No group members are currently assigned to this task.</p>
					</div>
				{/if}
			</div>
		</section>

		<!-- Assign Members Section (Admins only) -->
		{#if isUserAdmin}
			<section class="space-y-6">
				<h2 class="text-content text-2xl font-bold">Assign Members</h2>
				<div class="bg-base-200 rounded-xl p-6 shadow-md space-y-4">
					{#if groupMembers && groupMembers.length > 0}
						<div class="grid gap-4 sm:grid-cols-2">
							{#each groupMembers as member}
								<div class="bg-base-100 flex items-center justify-between rounded-lg p-4">
									<div class="flex items-center gap-3">
										<Icon icon="noto:bust-in-silhouette" class="info rounded-md p-2 text-3xl" />
										<p class="text-content font-medium">{member.user.name}</p>
									</div>
									<Button variant="secondary">Assign</Button>
								</div>
							{/each}
						</div>
					{:else}
						<p class="text-neutral">No group members available to assign.</p>
					{/if}
				</div>
			</section>
		{/if}
	</div>
</main>
