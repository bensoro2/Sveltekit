<script lang="ts">
  import { onMount } from 'svelte';
  import { goto } from '$app/navigation';
  import { user } from '$lib/stores/authStore';

  let username = '';
  let email = '';
  let password = '';
  let error = '';
  let showForm = false;

  onMount(() => {
    const token = localStorage.getItem('token');
    if (token) {
      goto('/');
    } else {
      showForm = true;
    }
  });

  async function handleSubmit(event: SubmitEvent) {
    event.preventDefault();
    error = '';

    try {
      const response = await fetch('http://localhost:3000/users/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, email, password })
      });

      const data = await response.json();

      if (data.user) {
        window.location.href = '/login';
      } else {
        error = data.error;
      }
    } catch (err) {
      error = 'เกิดข้อผิดพลาด กรุณาลองใหม่อีกครั้ง';
    }
  }
</script>

{#if showForm}
<div class="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-100 to-purple-100 py-12 px-4 sm:px-6 lg:px-8">
  <div class="max-w-md w-full space-y-8 bg-white p-8 rounded-xl shadow-2xl">
    <div>
      <h2 class="mt-2 text-center text-3xl font-extrabold text-gray-900">
        Create Account
      </h2>
      <p class="mt-2 text-center text-sm text-gray-600">
        Please fill in the information below to create your account
      </p>
    </div>

    <form class="mt-8 space-y-6" on:submit={handleSubmit}>
      {#if error}
        <div class="text-red-500 text-sm text-center">{error}</div>
      {/if}

      <div class="space-y-4">
        <div class="relative">
          <label for="username" class="text-sm font-medium text-gray-700 mb-1 block">Username</label>
          <input 
            id="username" 
            name="username" 
            type="text" 
            required 
            bind:value={username}
            class="appearance-none relative block w-full px-3 py-3 border border-gray-300 rounded-lg placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition duration-150 ease-in-out" 
            placeholder="Enter username">
        </div>

        <div class="relative">
          <label for="email" class="text-sm font-medium text-gray-700 mb-1 block">Email</label>
          <input 
            id="email" 
            name="email" 
            type="email" 
            required 
            bind:value={email}
            class="appearance-none relative block w-full px-3 py-3 border border-gray-300 rounded-lg placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition duration-150 ease-in-out" 
            placeholder="Enter your email">
        </div>

        <div class="relative">
          <label for="password" class="text-sm font-medium text-gray-700 mb-1 block">Password</label>
          <input 
            id="password" 
            name="password" 
            type="password" 
            required 
            bind:value={password}
            class="appearance-none relative block w-full px-3 py-3 border border-gray-300 rounded-lg placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition duration-150 ease-in-out" 
            placeholder="Enter password">
        </div>
      </div>

      <div>
        <button type="submit" 
          class="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transform transition hover:scale-[1.02] duration-150">
          <span class="absolute left-0 inset-y-0 flex items-center pl-3">
            <svg class="h-5 w-5 text-indigo-300 group-hover:text-indigo-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
              <path fill-rule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clip-rule="evenodd" />
            </svg>
          </span>
          Register
        </button>
      </div>

      <div class="text-center text-sm">
        <span class="text-gray-600">Already have an account? </span>
        <a href="/login" class="font-medium text-indigo-600 hover:text-indigo-500">Sign in</a>
      </div>
    </form>
  </div>
</div>
{/if}