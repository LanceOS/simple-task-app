<script lang="ts">
	import { goto } from '$app/navigation';
	import { authClient } from '$lib/auth-client';
	import Button from '$lib/client/components/ui/Button.svelte';
	
	const session = authClient.useSession();

	const getStarted = () => {
		if(!$session?.data?.user) {
			goto("/signin")
		}
		else {
			goto("/groups")
		}
	}
</script>

<main class="flex min-h-screen flex-col bg-base-100">
	<section class="flex min-h-screen items-center justify-center bg-gradient-to-br from-base-100 to-base-200 px-4 py-24">
		<div class="max-w-2xl text-center items-center flex flex-col">
			<h1 class="mb-6 text-5xl font-extrabold text-content sm:text-6xl">
				Greater Task
			</h1>
			<p class="mb-8 text-xl text-neutral sm:text-2xl leading-relaxed">
				A simple, collaborative task tracking app for groups of any size.
			</p>

			<Button type="button" class="primary text-lg px-8 py-4 rounded-lg font-semibold" onclick={getStarted}>
				Get Started
			</Button>
		</div>
	</section>

	<section class="bg-base-200 px-4 py-20">
		<div class="mx-auto max-w-6xl text-center">
			<h2 class="mb-6 text-3xl font-bold text-content sm:text-4xl">
				How does it work?
			</h2>
			<p class="mb-16 text-lg leading-relaxed text-neutral max-w-3xl mx-auto">
				Create groups for yourself or others with <span class="font-semibold primary px-2 py-1 rounded">Greater Task</span>. In these groups, you can create and share tasks that everyone can tackle together.
			</p>

			<div class="grid gap-8 md:grid-cols-3">
				<div class="bg-base-100 rounded-2xl p-8 shadow-lg transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
					<div class="mb-4 text-4xl">📋</div>
					<h3 class="mb-4 text-xl font-bold text-content">1. Create a Group</h3>
					<p class="text-neutral leading-relaxed">
						Set up private or public groups tailored to your team, friends, or community.
					</p>
				</div>
				
				<div class="bg-base-100 rounded-2xl p-8 shadow-lg transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
					<div class="mb-4 text-4xl">✅</div>
					<h3 class="mb-4 text-xl font-bold text-content">2. Add Tasks</h3>
					<p class="text-neutral leading-relaxed">
						Quickly create tasks, assign responsibilities, and set deadlines.
					</p>
				</div>
				
				<div class="bg-base-100 rounded-2xl p-8 shadow-lg transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
					<div class="mb-4 text-4xl">🤝</div>
					<h3 class="mb-4 text-xl font-bold text-content">3. Collaborate</h3>
					<p class="text-neutral leading-relaxed">
						Everyone in the group can contribute and track progress together.
					</p>
				</div>
			</div>
		</div>
	</section>

	<section class="bg-base-100 px-4 py-20">
		<div class="mx-auto max-w-6xl">
			<div class="text-center mb-16">
				<h2 class="mb-6 text-3xl font-bold text-content sm:text-4xl">
					Why Choose Greater Task?
				</h2>
				<p class="text-lg text-neutral max-w-2xl mx-auto">
					Built for simplicity without sacrificing functionality. Perfect for teams of any size.
				</p>
			</div>

			<div class="grid gap-8 md:grid-cols-2">
				<div class="flex items-start gap-4 p-6">
					<div class="accent text-2xl p-3 rounded-lg flex-shrink-0">🚀</div>
					<div>
						<h3 class="text-xl font-bold text-content mb-2">Simple & Fast</h3>
						<p class="text-neutral">No complex setup or overwhelming features. Just create a group and start collaborating.</p>
					</div>
				</div>
				
				<div class="flex items-start gap-4 p-6">
					<div class="secondary text-2xl p-3 rounded-lg flex-shrink-0">🔒</div>
					<div>
						<h3 class="text-xl font-bold text-content mb-2">Privacy First</h3>
						<p class="text-neutral">Your data stays secure with flexible privacy controls for every group.</p>
					</div>
				</div>
				
				<div class="flex items-start gap-4 p-6">
					<div class="info text-2xl p-3 rounded-lg flex-shrink-0">📱</div>
					<div>
						<h3 class="text-xl font-bold text-content mb-2">Works Everywhere</h3>
						<p class="text-neutral">Access your tasks from any device, anywhere, anytime.</p>
					</div>
				</div>
				
				<div class="flex items-start gap-4 p-6">
					<div class="success text-2xl p-3 rounded-lg flex-shrink-0">⚡</div>
					<div>
						<h3 class="text-xl font-bold text-content mb-2">Real-time Updates</h3>
						<p class="text-neutral">See changes instantly as your team updates tasks and makes progress.</p>
					</div>
				</div>
			</div>
		</div>
	</section>

	<section class="bg-gradient-to-r from-base-200 to-base-300 px-4 py-20">
		<div class="mx-auto max-w-4xl text-center">
			<h2 class="mb-6 text-3xl font-bold text-content sm:text-4xl">
				Ready to get organized?
			</h2>
			<p class="mb-8 text-lg text-neutral max-w-2xl mx-auto">
				Join thousands of teams already using Greater Task to stay productive and collaborate effectively.
			</p>
			
			<Button type="button" class="text-lg px-8 py-4 rounded-lg font-semibold mx-auto" onclick={getStarted}>
				Start Your First Group
			</Button>
		</div>
	</section>
</main>