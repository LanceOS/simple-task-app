<script lang="ts">
	import { goto } from '$app/navigation';
	import { authClient } from '$lib/auth-client';
	import Button from '$lib/client/components/ui/Button.svelte';
	import Icon from '@iconify/svelte';

	const session = authClient.useSession();

	const getStarted = () => {
		if (!$session?.data?.user) {
			goto('/signin');
		} else {
			goto('/groups');
		}
	};
</script>

<main class="bg-base-100 flex min-h-screen flex-col">
	<section
		class="from-base-100 to-base-200 flex min-h-screen items-center justify-center bg-gradient-to-br px-4 py-24"
	>
		<div class="flex max-w-2xl flex-col items-center text-center">
			<h1 class="text-content mb-6 text-5xl font-extrabold sm:text-6xl">Greater Task</h1>
			<p class="text-neutral mb-8 text-xl leading-relaxed sm:text-2xl">
				A simple, collaborative task tracking app for groups of any size.
			</p>

			<Button
				type="button"
				class="primary rounded-lg px-8 py-4 text-lg font-semibold"
				onclick={getStarted}
			>
				Get Started
			</Button>
		</div>
	</section>

	<section class="bg-base-200 px-4 py-20">
		<div class="mx-auto max-w-6xl text-center">
			<h2 class="text-content mb-6 text-3xl font-bold sm:text-4xl">How does it work?</h2>
			<p class="text-neutral mx-auto mb-16 max-w-3xl text-lg leading-relaxed">
				Create groups for yourself or others with <span
					class="primary rounded px-2 py-1 font-semibold">Greater Task</span
				>. In these groups, you can create and share tasks that everyone can tackle together.
			</p>

			<div class="grid gap-8 md:grid-cols-3">
				<div
					class="bg-base-100 rounded-2xl p-8 shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
				>
					<Icon icon="unjs:unbuild" class="text-5xl w-full mb-2"/>
					<h3 class="text-content mb-4 text-xl font-bold">1. Create a Group</h3>
					<p class="text-neutral leading-relaxed">
						Set up private or public groups tailored to your team, friends, or community.
					</p>
				</div>

				<div
					class="bg-base-100 rounded-2xl p-8 shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
				>
					<Icon icon="unjs:jimp-compact" class="text-5xl mb-2 w-full"/>
					<h3 class="text-content mb-4 text-xl font-bold">2. Add Tasks</h3>
					<p class="text-neutral leading-relaxed">
						Quickly create tasks, assign responsibilities, and set deadlines.
					</p>
				</div>

				<div
					class="bg-base-100 rounded-2xl p-8 shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
				>
					<Icon icon="twemoji:handshake" class="text-5xl mb-2 w-full"/>
					<h3 class="text-content mb-4 text-xl font-bold">3. Collaborate</h3>
					<p class="text-neutral leading-relaxed">
						Everyone in the group can contribute and track progress together.
					</p>
				</div>
			</div>
		</div>
	</section>

	<section class="bg-base-100 px-4 py-20">
		<div class="mx-auto max-w-6xl">
			<div class="mb-16 text-center">
				<h2 class="text-content mb-6 text-3xl font-bold sm:text-4xl">Why Choose Greater Task?</h2>
				<p class="text-neutral mx-auto max-w-2xl text-lg">
					Built for simplicity without sacrificing functionality. Perfect for teams of any size.
				</p>
			</div>

			<div class="grid gap-8 md:grid-cols-2">
				<div class="flex items-start gap-4 p-6">
					<Icon icon="unjs:db0" class="info h-12 w-12 flex-shrink-0 rounded-lg p-2 text-5xl" />
					<div>
						<h3 class="text-content mb-2 text-xl font-bold">Simple & Fast</h3>
						<p class="text-neutral">
							No complex setup or overwhelming features. Just create a group and start
							collaborating.
						</p>
					</div>
				</div>

				<div class="flex items-start gap-4 p-6">
					<Icon icon="unjs:unstorage" class="error h-12 w-12 flex-shrink-0 rounded-lg p-2 text-5xl" />
					<div>
						<h3 class="text-content mb-2 text-xl font-bold">Privacy First</h3>
						<p class="text-neutral">
							Your data stays secure with flexible privacy controls for every group.
						</p>
					</div>
				</div>

				<div class="flex items-start gap-4 p-6">
					<Icon
						icon="noto:mobile-phone"
						class="warning h-12 w-12 flex-shrink-0 rounded-lg p-2 text-5xl"
					/>
					<div>
						<h3 class="text-content mb-2 text-xl font-bold">Works Everywhere</h3>
						<p class="text-neutral">Access your tasks from any device, anywhere, anytime.</p>
					</div>
				</div>

				<div class="flex items-start gap-4 p-6">
					<Icon
						icon="unjs:h3"
						class="success h-12 w-12 flex-shrink-0 rounded-lg p-2 text-5xl"
					/>
					<div>
						<h3 class="text-content mb-2 text-xl font-bold">Real-time Updates</h3>
						<p class="text-neutral">
							See changes instantly as your team updates tasks and makes progress.
						</p>
					</div>
				</div>
			</div>
		</div>
	</section>

	<section class="from-base-200 to-base-300 bg-gradient-to-r px-4 py-20">
		<div class="mx-auto max-w-4xl text-center">
			<h2 class="text-content mb-6 text-3xl font-bold sm:text-4xl">Ready to get organized?</h2>
			<p class="text-neutral mx-auto mb-8 max-w-2xl text-lg">
				Join thousands of teams already using Greater Task to stay productive and collaborate
				effectively.
			</p>

			<Button
				type="button"
				class="mx-auto rounded-lg px-8 py-4 text-lg font-semibold"
				onclick={getStarted}
			>
				Start Your First Group
			</Button>
		</div>
	</section>
</main>
