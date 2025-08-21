<script lang="ts">
	import { authClient } from '$lib/auth-client';
	const session = authClient.useSession();
</script>

<main class="h-screen bg-gray-50 flex flex-col gap-20 items-center justify-center px-4">
	<section class="text-center max-w-2xl">
		<h1 class="text-4xl sm:text-5xl font-extrabold text-gray-900 mb-4">
			Greater Task
		</h1>
		<p class="text-lg sm:text-xl text-gray-600 mb-8">
			A simple, collaborative task tracking app for groups of any size.
		</p>

		<div class="flex gap-4 justify-center">
			<a
				class="px-6 py-3 rounded-2xl bg-indigo-600 text-white font-medium shadow-md hover:bg-indigo-700 transition"
                href="/signin"
                aria-label="Get started by signin in!"
			>
				Get Started
			</a>
		</div>
	</section>

	<section class="max-w-4xl text-center">
		<h2 class="text-2xl sm:text-3xl font-semibold text-gray-900 mb-4">
			How does it work?
		</h2>
		<p class="text-gray-600 text-lg leading-relaxed mb-12">
			Create groups for yourself or others with <span class="font-semibold text-indigo-600">Greater Task</span>.
			In these groups, you can create and share tasks that everyone can tackle together.
		</p>

		<div class="grid sm:grid-cols-3 gap-8">
			<div class="bg-white p-6 rounded-2xl shadow hover:shadow-lg transition">
				<h3 class="text-xl font-semibold text-gray-800 mb-2">1. Create a Group</h3>
				<p class="text-gray-600 text-sm">
					Set up private or public groups tailored to your team, friends, or community.
				</p>
			</div>
			<div class="bg-white p-6 rounded-2xl shadow hover:shadow-lg transition">
				<h3 class="text-xl font-semibold text-gray-800 mb-2">2. Add Tasks</h3>
				<p class="text-gray-600 text-sm">
					Quickly create tasks, assign responsibilities, and set deadlines.
				</p>
			</div>
			<div class="bg-white p-6 rounded-2xl shadow hover:shadow-lg transition">
				<h3 class="text-xl font-semibold text-gray-800 mb-2">3. Collaborate</h3>
				<p class="text-gray-600 text-sm">
					Everyone in the group can contribute and track progress together.
				</p>
			</div>
		</div>
	</section>
</main>
