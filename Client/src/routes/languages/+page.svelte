<script lang="ts">
	import { i18n, setLanguage } from "$lib/stores/Translation.store";
    
    
</script>

<main class="max-w-7xl mx-auto px-4 flex flex-col justify-center gap-8 h-screen text-center">
    <h1 class="text-3xl">Translations are done by AI and may not be accurate.</h1>

    
    <ul>
        <li><button type="button" class="btn btn-accent btn-lg" onclick={() => setLanguage()}>

        </button></li>
    </ul>
</main>