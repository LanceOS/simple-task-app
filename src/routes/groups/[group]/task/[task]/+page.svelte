<script lang="ts">
	import type { PageProps } from './$types';
	import Icon from '@iconify/svelte';
	import { Toaster } from '$lib/client/components/toaster/Toaster';
	import { page } from '$app/state';
	import { TaskClientService } from '$lib/client/services/TaskClientService';
	import { goto } from '$app/navigation';

	const groupId = page.params.group;

	const { data }: PageProps = $props();
	let { task, isUserAdmin } = data;
	let groupMembers = $state(data.groupMembers || []);
	let assignees = $state(data.assignees || []);
	let originalMembersArr = $state(data.groupMembers || []);

	let loading: boolean = $state(false);

	let confirmDelete = $state(false);

	const assignMember = async (memberId: string) => {
		if (!task || !groupId || !memberId) {
			Toaster.ejectToast({
				message: 'Missing required data for assigning user!',
				type: 'error'
			});
			return;
		}
		loading = true;

		try {
			const response = await TaskClientService.assignMemberToTask(memberId, task.id, groupId);
			Toaster.ejectToast({
				message: 'Assigned member to task!',
				type: 'success'
			});

			const normalizedResponse = {
				...response,
				createdAt: new Date(response.createdAt)
			};
			groupMembers = groupMembers.filter((member) => member.userId !== memberId);
			assignees = [...assignees, normalizedResponse];
		} catch (error: any) {
			Toaster.ejectToast({
				message: error.message || 'Failed to assign member to task!',
				type: 'error'
			});
		}
		finally {
			loading = false;
		}
	};

	const unassignMember = async (memberId: string) => {
		if (!task?.id) {
			Toaster.ejectToast({
				message: 'Failed to get taskId!',
				type: 'error'
			});
			return;
		}

		loading = true;
		try {
			await TaskClientService.unassignMemberToTask(memberId, task.id, groupId);
			Toaster.ejectToast({
				message: 'Successfully unassigned member from task!',
				type: 'success'
			});

			assignees = (assignees || []).filter((assignee) => assignee.assigneeId !== memberId);
			const filteredMembers = originalMembersArr.filter((member) => member.userId === memberId);
			groupMembers = [...groupMembers.filter((m) => m.userId !== memberId), ...filteredMembers];
		} catch (error: any) {
			Toaster.ejectToast({
				message: error.message || 'Failed to remove member from task!',
				type: 'error'
			});
			return;
		}
		finally {
			loading = false;
		}
	};

	const handleDelete = async () => {
		if (!task) {
			Toaster.ejectToast({
				message: 'Task not provided for deletion!',
				type: 'error'
			});
			return;
		}

		loading = true;
		try {
			await TaskClientService.deleteCurrentTask(task.id, groupId);
			Toaster.ejectToast({
				message: 'Successfully delete task!',
				type: 'success'
			});
			goto(`/groups/${groupId}`);
		} catch (error: any) {
			Toaster.ejectToast({
				message: error.message || 'Failed to delete task!',
				type: 'error'
			});
		}
		finally {
			loading = false;
		}
	};
</script>

<main class="bg-base-100 min-h-screen px-4 py-24">
	<div class="mx-auto max-w-7xl space-y-12">
		<!-- Task Header -->
		{#if task}
			<section class="space-y-4 text-center">
				<h1 class="text-content text-4xl font-bold">{task.taskName}</h1>
				<p class="text-neutral mx-auto max-w-2xl leading-relaxed">
					{task.description || 'No description provided for this task.'}
				</p>
			</section>
		{/if}

		<!-- Assignees Section -->
		<section class="space-y-6">
			<div class="flex items-center justify-between gap-4">
				<div class="flex items-center gap-2">
					<button
						type="button"
						disabled={loading}
						aria-label="Return to groups."
						class="btn btn-neutral"
						onclick={() => goto(`/groups/${groupId}`)}
					>
						<Icon icon="grommet-icons:return" />
					</button>
					<h2 class="text-content text-2xl font-bold">Assignees</h2>
				</div>

				<!-- Delete Task Button -->
				{#if confirmDelete}
					<div class="flex items-center gap-2">
						<button class="btn btn-error" onclick={handleDelete} disabled={loading} aria-label="Confirm task deletion">Confirm Delete</button>
						<button class="btn btn-neutral" onclick={() => (confirmDelete = false)} aria-label="Cancel task deletion">Cancel</button>
					</div>
				{:else}
					<button class="btn btn-error" onclick={() => (confirmDelete = true)} aria-label="Delete current task.">Delete Task</button>
				{/if}
			</div>

			<div class="bg-base-200 rounded-xl p-6 shadow-md">
				{#if assignees && assignees.length > 0}
					<div class="space-y-4">
						{#each assignees as assignee}
							<div class="bg-base-100 flex items-center gap-4 rounded-lg p-4">
								<Icon icon="noto:bust-in-silhouette" class="info rounded-md p-2 text-4xl" />
								<div class="flex-1">
									<h3 class="text-content font-semibold">{assignee.member?.name}</h3>
									<p class="text-neutral text-sm">
										Assigned {assignee.createdAt.toLocaleDateString()}
									</p>
								</div>
								<div class="flex items-center gap-4">
									<span class="success rounded-full px-3 py-1 text-xs font-medium">Assigned</span>
									<button
										class="btn btn-primary btn-sm"
										aria-label="Unassign user from task."
										disabled={loading}
										onclick={() => unassignMember(assignee.assigneeId)}
									>
										Unassign Member
									</button>
								</div>
							</div>
						{/each}
					</div>
				{:else}
					<div class="py-8 text-center">
						<Icon icon="noto:warning" class="text-neutral mx-auto mb-4 text-5xl" />
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
				<div class="bg-base-200 space-y-4 rounded-xl p-6 shadow-md">
					{#if groupMembers && groupMembers.length > 0}
						<div class="grid gap-4 sm:grid-cols-2">
							{#each groupMembers as member}
								<div class="bg-base-100 flex items-center justify-between rounded-lg p-4">
									<div class="flex items-center gap-3">
										<Icon icon="noto:bust-in-silhouette" class="info rounded-md p-2 text-3xl" />
										<p class="text-content font-medium">{member.member.name}</p>
									</div>
									<button class="btn btn-secondary" onclick={() => assignMember(member.userId)} disabled={loading}
										>Assign</button
									>
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
