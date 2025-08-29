<script lang="ts">
    let { title, input = $bindable() } = $props<{
        title: string,
        input: string
    }>()
</script>

<div class="flex flex-col gap-2">
    <label for={title} class="text-xl font-bold">{title}</label>
    <input type="text" name={title} id={title} bind:value={input} class="text-lg p-2 border rounded-md focus:outline-0" />
</div>