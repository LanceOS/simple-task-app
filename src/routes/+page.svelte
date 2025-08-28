<script lang="ts">
	import { authClient } from '$lib/auth-client';
	const session = authClient.useSession();
</script>

<main class="flex max-h-screen h-screen flex-col items-center gap-20 py-24 px-4 bg-base-200">
	<section class="max-w-2xl text-center">
		<h1 class="mb-4 text-4xl font-extrabold sm:text-5xl">Greater Task</h1>
		<p class="mb-8 text-lg sm:text-xl">
			A simple, collaborative task tracking app for groups of any size.
		</p>

		<div class="flex justify-center gap-4">
			<a
				class="btn-big primary rounded-lg"
				href="/signin"
				aria-label="Get started by signin in!"
			>
				Get Started
			</a>
		</div>
	</section>

	<section class="max-w-4xl text-center">
		<h2 class="mb-4 text-2xl font-semibold text-gray-900 sm:text-3xl">How does it work?</h2>
		<p class="mb-12 text-lg leading-relaxed text-gray-600">
			Create groups for yourself or others with <span class="font-semibold text-indigo-600"
				>Greater Task</span
			>. In these groups, you can create and share tasks that everyone can tackle together.
		</p>

		<div class="grid gap-8 sm:grid-cols-3">
			<div class="rounded-2xl bg-white p-6 shadow transition hover:shadow-lg">
				<h3 class="mb-2 text-xl font-semibold text-gray-800">1. Create a Group</h3>
				<p class="text-sm text-gray-600">
					Set up private or public groups tailored to your team, friends, or community.
				</p>
			</div>
			<div class="rounded-2xl bg-white p-6 shadow transition hover:shadow-lg">
				<h3 class="mb-2 text-xl font-semibold text-gray-800">2. Add Tasks</h3>
				<p class="text-sm text-gray-600">
					Quickly create tasks, assign responsibilities, and set deadlines.
				</p>
			</div>
			<div class="rounded-2xl bg-white p-6 shadow transition hover:shadow-lg">
				<h3 class="mb-2 text-xl font-semibold text-gray-800">3. Collaborate</h3>
				<p class="text-sm text-gray-600">
					Everyone in the group can contribute and track progress together.
				</p>
			</div>
		</div>
	</section>
</main>
