<script lang="ts">
    import Input from '$lib/client/components/ui/Input.svelte';
    import Textarea from '$lib/client/components/ui/Textarea.svelte';
    import Icon from '@iconify/svelte';
    import { GroupClient } from '$lib/client/services/GroupClient.clientutil';
    import type { PageProps } from './$types';
    import { Toaster } from '$lib/client/components/toaster/Toaster';
    import type { IGroups } from '$lib/server/schemas/task_group.schema';
    import { goto } from '$app/navigation';
    import { i18n } from '$lib/stores/Translation.store';

    const { data }: PageProps = $props();
    let ownedGroups: IGroups[] = $state(data.ownedGroups);
    let joinedGroups = $state(data.joinedGroups);

    let createTask: boolean = $state(false);
    let disableActionButtons: boolean = $state(false);

    let newGroupDetails: { name: string; description: string } = $state({
        name: '',
        description: ''
    });

    let joinCode: string = $state('');

    const createGroup = async () => {
        try {
            const response = await GroupClient.createGroup(newGroupDetails);
            Toaster.ejectToast({
                message: 'Created new task group!',
                type: 'success'
            });
            goto(`/groups/${response}`);
        } catch (error: any) {
            Toaster.ejectToast({
                message: error.message || 'Failed to create new group!',
                type: 'error'
            });
        }
    };

    const joinGroup = async () => {
        try {
            const response = await GroupClient.joinGroup(joinCode);
            Toaster.ejectToast({
                message: 'Successfully joined group!',
                type: 'success'
            });
            goto(`/groups/${response}`);
        } catch (error: any) {
            Toaster.ejectToast({
                message: error.message || 'Failed to join group!',
                type: 'error'
            });
        }
    };
</script>

<main class="bg-base-100 mx-auto min-h-screen max-w-7xl space-y-8 px-4 py-24">
    <section class="space-y-4 p-12 text-center">
        <Icon icon="unjs:db0" class="mx-auto text-6xl" />
        <h1 class="text-3xl font-bold">{$i18n.t('mainGroupsDashboard.header.title')}</h1>
        <p class="text-lg">{$i18n.t('mainGroupsDashboard.header.subtitle')}</p>
    </section>
    <section class="space-y-6">
        <div class="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <h2 class="text-content text-2xl font-bold">
                {$i18n.t('mainGroupsDashboard.ownedGroups.header.title')}
            </h2>
            <div class="flex flex-wrap items-center gap-3">
                <button
                    type="button"
                    aria-label="{$i18n.t('mainGroupsDashboard.ownedGroups.header.createButton')}"
                    onclick={() => (createTask = !createTask)}
                    class="btn btn-primary"
                >
                    {$i18n.t('mainGroupsDashboard.ownedGroups.header.createButton')}
                </button>
                <a href="/manage_groups" class="btn btn-secondary">
                    {$i18n.t('mainGroupsDashboard.ownedGroups.header.manageButton')}
                </a>
            </div>
        </div>

        {#if createTask}
            <div class="bg-base-200 rounded-xl p-6 shadow-lg sm:p-8">
                <h3 class="text-content mb-6 text-xl font-bold sm:text-2xl">
                    {$i18n.t('mainGroupsDashboard.ownedGroups.createForm.title')}
                </h3>
                <form class="space-y-6">
                    <Input
                        title={$i18n.t('mainGroupsDashboard.ownedGroups.createForm.nameInput.title')}
                        type="text"
                        maxlength={80}
                        placeholder={$i18n.t('mainGroupsDashboard.ownedGroups.createForm.nameInput.placeholder')}
                        bind:input={newGroupDetails.name}
                    />
                    <Textarea
                        title={$i18n.t('mainGroupsDashboard.ownedGroups.createForm.descriptionInput.title')}
                        rows={3}
                        maxlength={300}
                        bind:input={newGroupDetails.description}
                        placeholder={$i18n.t(
                            'mainGroupsDashboard.ownedGroups.createForm.descriptionInput.placeholder'
                        )}
                    />
                    <div class="flex gap-3">
                        <button
                            type="button"
                            class="btn btn-primary"
                            onclick={createGroup}
                            disabled={disableActionButtons}
                        >
                            {$i18n.t('mainGroupsDashboard.ownedGroups.createForm.createButton')}
                        </button>
                        <button type="button" class="btn btn-error" onclick={() => (createTask = false)}>
                            {$i18n.t('mainGroupsDashboard.ownedGroups.createForm.cancelButton')}
                        </button>
                    </div>
                </form>
            </div>
        {/if}

        {#if ownedGroups.length > 0}
            <div class="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {#each ownedGroups as owned}
                    <a
                        href={`/groups/${owned.id}`}
                        class="bg-base-200 flex flex-col gap-3 rounded-xl p-6 shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
                    >
                        <Icon icon="noto:busts-in-silhouette" class="bg-info rounded-lg p-2 text-4xl" />
                        <h3 class="text-content text-lg font-bold sm:text-xl">{owned.name}</h3>
                        <p class="text-neutral leading-relaxed">
                            {owned.description.length > 60
                                ? `${owned.description.slice(0, 60)}...`
                                : owned.description}
                        </p>
                        <span class="badge badge-success w-fit">
                            {$i18n.t('mainGroupsDashboard.ownedGroups.card.badge')}
                        </span>
                    </a>
                {/each}
            </div>
        {:else}
            <div class="bg-base-200 space-y-4 rounded-xl p-12 text-center shadow-md">
                <Icon icon="noto:clipboard" class="mx-auto text-6xl" />
                <h3 class="text-content text-xl font-bold">
                    {$i18n.t('mainGroupsDashboard.ownedGroups.emptyState.title')}
                </h3>
                <p class="text-neutral">
                    {$i18n.t('mainGroupsDashboard.ownedGroups.emptyState.message')}
                </p>
            </div>
        {/if}
    </section>
    <section class="space-y-6">
        <h2 class="text-content text-2xl font-bold">
            {$i18n.t('mainGroupsDashboard.joinedGroups.header.title')}
        </h2>

        <div class="bg-base-200 rounded-xl p-6 shadow-md">
            <h3 class="text-content mb-4 text-lg font-semibold">
                {$i18n.t('mainGroupsDashboard.joinedGroups.joinForm.title')}
            </h3>
            <form class="flex flex-col gap-4 sm:flex-row sm:items-center">
                <input
                    type="text"
                    name="code"
                    id="code"
                    bind:value={joinCode}
                    class="bg-base-100 border-base-300 focus:ring-primary text-content w-full rounded-lg border px-4 py-3 focus:ring-2 focus:outline-none"
                    placeholder={$i18n.t('mainGroupsDashboard.joinedGroups.joinForm.inputPlaceholder')}
                />
                <button
                    type="button"
                    class="btn btn-primary w-full sm:w-auto"
                    disabled={disableActionButtons}
                    onclick={joinGroup}
                >
                    {$i18n.t('mainGroupsDashboard.joinedGroups.joinForm.joinButton')}
                </button>
            </form>
        </div>

        {#if joinedGroups && joinedGroups.length > 0}
            <div class="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {#each joinedGroups as joined}
                    <a
                        href={`/groups/${joined.id}`}
                        class="bg-base-200 flex flex-col gap-3 rounded-xl p-6 shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
                    >
                        <Icon icon="twemoji:handshake" class="text-4xl" />
                        <h3 class="text-content text-lg font-bold sm:text-xl">{joined.name}</h3>
                        <p class="text-neutral leading-relaxed">
                            {joined.description.length > 60
                                ? `${joined.description.slice(0, 60)}...`
                                : joined.description}
                        </p>
                        <span class="badge badge-warning w-fit">
                            {$i18n.t('mainGroupsDashboard.joinedGroups.card.badge')}
                        </span>
                    </a>
                {/each}
            </div>
        {:else}
            <div class="bg-base-200 space-y-4 rounded-xl p-12 text-center shadow-md">
                <Icon icon="noto-v1:magnifying-glass-tilted-left" class="mx-auto text-6xl" />
                <h3 class="text-content text-xl font-bold">
                    {$i18n.t('mainGroupsDashboard.joinedGroups.emptyState.title')}
                </h3>
                <p class="text-neutral">
                    {$i18n.t('mainGroupsDashboard.joinedGroups.emptyState.message')}
                </p>
            </div>
        {/if}
    </section>
</main>