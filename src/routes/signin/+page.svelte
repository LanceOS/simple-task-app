<script lang="ts">
	import Icon from '@iconify/svelte';
</script>

<main class="mx-auto flex h-screen max-w-5xl items-center justify-center px-4">
	<form class="border h-fit w-fit p-8 rounded-md space-y-8">
		<h1 class="text-3xl sm:text-5xl">Sign In</h1>
        <div>
            <label for="email">Email:</label>
            <input type="text" name="email" id="email" aria-label="Please enter your email" class="border">
        </div>
		<button type="button" aria-label="Confirm Sign In" class="border flex items-center rounded-md px-4 py-2 cursor-pointer gap-2">
            <Icon icon="ic:baseline-email"/>
            Confirm
        </button>
	</form>
</main>
