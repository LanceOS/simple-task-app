<script lang="ts">
	import type { JoinedGroupsResponse } from '$lib/@types/Groups.types';
	import { authClient } from '$lib/auth-client';
	import { Toaster } from '$lib/client/components/toaster/Toaster';
	import { GroupClient } from '$lib/client/services/GroupClient.clientutil';
	import type { IGroups } from '$lib/server/schemas/task_group.schema';
	import Icon from '@iconify/svelte';
	import type { PageProps } from './$types';

	const { data }: PageProps = $props();
	let ownedGroups: IGroups[] = $state(data.ownedGroups);
	let joinedGroups: JoinedGroupsResponse[] = $state(data.joinedGroups);

	let disableActionButtons: boolean = $state(false);

	let ownedGroupDeleteButtonVisible: boolean = $state(false);
	let joinedGroupLeaveButtonVisible: boolean = $state(false);

	let ownedGroupMap: Map<string, boolean> = $state(new Map());
	let joinedGroupMap: Map<string, boolean> = $state(new Map());

	let confirmingDelete: boolean = $state(false);
	let confirmingLeave: boolean = $state(false);

	// In this function the a new map is being created and then being assigned tot he original map. This is to trigger svelt's reactivity.
	const selectOwnedGroup = (groupId: string) => {
		const isSelected = ownedGroupMap.get(groupId);
		const newMap = new Map(ownedGroupMap);
		newMap.set(groupId, !isSelected);
		ownedGroupMap = newMap;
		ownedGroupDeleteButtonVisible = Array.from(ownedGroupMap.values()).some((value) => value);
	};

	const selectJoinedGroup = (groupId: string) => {
		const isSelected = joinedGroupMap.get(groupId);
		const newMap = new Map(joinedGroupMap);
		newMap.set(groupId, !isSelected);
		joinedGroupMap = newMap;
		joinedGroupLeaveButtonVisible = Array.from(joinedGroupMap.values()).some((value) => value);
		console.log(joinedGroupMap);
	};

	/**
	 * Loops through the currently saved ids in the ownedGroupsMap
	 * if a saved group is marked "true" for deletion then it's id is
	 * saved in an array. Then the array is passed to the delete group endpoint.
	 */
	const deleteGroup = async () => {
		disableActionButtons = true;
		const arr: string[] = [];
		for (const [key, value] of ownedGroupMap) {
			const [group] = ownedGroups.filter((group) => group.id === key);
			if (value === true) {
				arr.push(key);
			}
		}
		console.log(arr)
		try {
			await GroupClient.deleteGroup(arr);
			ownedGroups = ownedGroups.filter((group) => !arr.includes(group.id));
			ownedGroupMap = new Map();
			ownedGroupDeleteButtonVisible = false;
			Toaster.ejectToast({
				message: 'Successfully deleted group!',
				type: 'success'
			});
		} catch (error: any) {
			Toaster.ejectToast({
				message: error.message || 'Failed to delete group!',
				type: 'error'
			});
		} finally {
			disableActionButtons = false;
		}
	};

	const leaveJoinedGroup = async () => {
		disableActionButtons = true;
		const arr: string[] = [];
		for (const [key, value] of joinedGroupMap) {
			if (value === true) {
				arr.push(key);
			}
		}
		try {
			await GroupClient.leaveGroups(arr);
			joinedGroups = joinedGroups.filter((group) => !arr.includes(group.id));
			joinedGroupMap = new Map();
			joinedGroupLeaveButtonVisible = false;
			disableActionButtons = false;

			Toaster.ejectToast({
				message: 'Successfully left group!',
				type: 'success'
			});
		} catch (error: any) {
			Toaster.ejectToast({
				message: error.message || 'Failed to leave group!',
				type: 'error'
			});
		} finally {
			disableActionButtons = false;
		}
	};
</script>

<main class="bg-base-100 min-h-screen px-4 py-24">
	<div class="mx-auto max-w-7xl space-y-12">
		<!-- Page Header -->
		<section class="space-y-4 text-center">
			<h1 class="text-content text-4xl font-bold">Manage Your Groups</h1>
			<p class="text-neutral mx-auto max-w-2xl">
				Select groups you own to delete, or groups you’ve joined to leave. Be careful—these actions
				cannot be undone.
			</p>
		</section>

		<!-- Owned Groups -->
		<section class="space-y-6">
			<h2 class="text-content text-2xl font-bold">Owned Groups</h2>
			<div class="bg-base-200 space-y-4 rounded-xl p-6 shadow-md">
				{#if ownedGroups.length > 0}
					{#each ownedGroups as owned}
						<div class="bg-base-100 flex items-center justify-between rounded-lg p-4">
							<div class="flex items-center gap-3">
								<Icon icon="unjs:unbuild" class="bg-info rounded-md p-2 text-4xl" />
								<p class="text-content font-medium">{owned.name}</p>
							</div>
							<div class="flex gap-2">
								<a
									href={`/groups/${owned.id}`}
									class="btn btn-primary btn-sm"
									aria-label={`Go to ${owned.name}`}
								>
									View
								</a>
								<button
									type="button"
									aria-label="Select group"
									class={`btn btn-sm
										${ownedGroupMap.get(owned.id) ? 'btn-error' : 'btn-warning'}`}
									onclick={() => selectOwnedGroup(owned.id)}
								>
									{ownedGroupMap.get(owned.id) ? 'Selected' : 'Select'}
								</button>
							</div>
						</div>
					{/each}

					{#if ownedGroupDeleteButtonVisible}
						<div class="flex justify-end pt-4">
							{#if !confirmingDelete}
								<button
									onclick={() => (confirmingDelete = true)}
									disabled={disableActionButtons}
									class="btn btn-error"
								>
									Delete Selected
								</button>
							{:else}
								<div class="flex gap-3">
									<button
										onclick={deleteGroup}
										disabled={disableActionButtons}
										class="btn btn-error"
									>
										Confirm Delete
									</button>
									<button onclick={() => (confirmingDelete = false)} class="btn btn-neutral">
										Cancel
									</button>
								</div>
							{/if}
						</div>
					{/if}
				{:else}
					<p class="text-neutral">You don’t own any groups yet.</p>
				{/if}
			</div>
		</section>

		<!-- Joined Groups -->
		<section class="space-y-6">
			<h2 class="text-content text-2xl font-bold">Joined Groups</h2>
			<div class="bg-base-200 space-y-4 rounded-xl p-6 shadow-md">
				{#if joinedGroups.length > 0}
					{#each joinedGroups as joined}
						<div class="bg-base-100 flex items-center justify-between rounded-lg p-4">
							<div class="flex items-center gap-3">
								<Icon icon="mdi:account-group-outline" class="info rounded-md p-2 text-3xl" />
								<p class="text-content font-medium">{joined.name}</p>
							</div>
							<div class="flex gap-2">
								<a
									href={`/groups/${joined.id}`}
									class="btn btn-primary btn-sm"
									aria-label={`Go to ${joined.name}`}
								>
									View
								</a>
								<button
									type="button"
									aria-label="Select group"
									class={`btn
										${joinedGroupMap.get(joined.id) ? 'btn-error' : 'btn-warning'}`}
									onclick={() => selectJoinedGroup(joined.id)}
								>
									{joinedGroupMap.get(joined.id) ? 'Selected' : 'Select'}
								</button>
							</div>
						</div>
					{/each}

					<!-- Leave Button (only visible when at least one selected) -->
					{#if joinedGroupLeaveButtonVisible}
						<div class="flex justify-end pt-4">
							{#if !confirmingLeave}
								<button
									onclick={() => (confirmingLeave = true)}
									disabled={disableActionButtons}
									class="btn btn-error"
								>
									Leave Selected
								</button>
							{:else}
								<div class="flex gap-3">
									<button
										onclick={leaveJoinedGroup}
										disabled={disableActionButtons}
										class="btn btn-error"
									>
										Confirm Leave
									</button>
									<button onclick={() => (confirmingLeave = false)} class="btn btn-neutral">
										Cancel
									</button>
								</div>
							{/if}
						</div>
					{/if}
				{:else}
					<p class="text-neutral">You haven’t joined any groups yet.</p>
				{/if}
			</div>
		</section>
	</div>
</main>
