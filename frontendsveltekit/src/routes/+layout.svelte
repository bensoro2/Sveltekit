<script lang="ts">
	import '../app.css';
	import { onMount } from 'svelte';
	import { user } from '$lib/stores/authStore';

	onMount(async () => {
		const token = localStorage.getItem('token');
		if (token) {
			try {
				const response = await fetch('http://localhost:3000/users/me', {
					headers: {
						'Authorization': `Bearer ${token}`
					}
				});
				if (response.ok) {
					const userData = await response.json();
					user.set(userData);
				}
			} catch (error) {
				console.error('Error fetching user data:', error);
				localStorage.removeItem('token');
			}
		}
	});

	function handleLogout() {
		localStorage.removeItem('token');
		user.set(null);
		window.location.href = '/login';
	}
</script>

<div class="min-h-screen flex flex-col bg-gradient-to-r from-blue-50 to-purple-50">
	<nav class="bg-white shadow-md">
		<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
			<div class="flex justify-between h-16">
				<div class="flex items-center">
					<a href="/" class="flex-shrink-0 flex items-center">
						<span class="text-2xl font-bold text-indigo-600">Logo</span>
					</a>
				</div>
				
				<div class="flex items-center space-x-4">
					{#if $user}
						<span class="text-gray-700">Welcome, {$user.username}</span>
						<button 
							on:click={handleLogout}
							class="px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-indigo-600 to-purple-600 rounded-lg hover:from-indigo-700 hover:to-purple-700 transition duration-150 hover:scale-105">
							Logout
						</button>
					{:else}
						<a href="/login" 
							class="px-4 py-2 text-sm font-medium text-gray-700 hover:text-indigo-600 transition duration-150">
							Sign In
						</a>
						<a href="/register" 
							class="px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-indigo-600 to-purple-600 rounded-lg hover:from-indigo-700 hover:to-purple-700 transition duration-150 hover:scale-105">
							Sign Up
						</a>
					{/if}
				</div>
			</div>
		</div>
	</nav>

	<slot />

	<footer class="bg-white shadow-md mt-auto">
		<div class="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
			<div class="text-center text-gray-600">
				<p>&copy; 2024 Your Company. All rights reserved.</p>
			</div>
		</div>
	</footer>
</div>
