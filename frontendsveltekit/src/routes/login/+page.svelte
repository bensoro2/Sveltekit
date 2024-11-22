<script lang="ts">
  import { onMount } from 'svelte';
  import { goto } from '$app/navigation';
  import { user } from '$lib/stores/authStore';

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
      const response = await fetch('http://localhost:3000/users/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });

      const data = await response.json();

      if (data.token) {
        localStorage.setItem('token', data.token);
        user.set(data.user);
        window.location.href = '/';
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
        Sign In
      </h2>
      <p class="mt-2 text-center text-sm text-gray-600">
        Please enter your credentials to access your account
      </p>
    </div>

    <form class="mt-8 space-y-6" on:submit={handleSubmit}>
      {#if error}
        <div class="text-red-500 text-sm text-center">{error}</div>
      {/if}

      <div class="space-y-4">
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
          Sign In
        </button>
      </div>

      <div class="text-center text-sm">
        <span class="text-gray-600">Don't have an account? </span>
        <a href="/register" class="font-medium text-indigo-600 hover:text-indigo-500">Register</a>
      </div>
    </form>
  </div>
</div>
{/if}