<script lang="ts">
    let { ...props } = $props()
</script>

<form {...props} class="p-12 flex flex-col gap-8 rounded-lg shadow-lg">
    <slot />
</form>