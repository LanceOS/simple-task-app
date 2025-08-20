<script lang="ts">
	import { authClient } from "$lib/auth-client";

    

    const session = authClient.useSession()

    console.log($session);
</script>

<main>
    <h1>Greater Task!</h1>
    <p>The simple group task tracking app.</p>
</main>