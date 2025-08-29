<script lang="ts">
    let { type, title, input = $bindable() } = $props<{
        type: string,
        title: string,
        input: string
    }>()
</script>

<div class="flex flex-col gap-2">
    <label for={title} class="text-xl font-bold">{title}</label>
    <input type={type} name={title} id={title} bind:value={input} class="text-lg p-2 border rounded-md focus:outline-0 border-[var(--color-neutral)]" />
</div>