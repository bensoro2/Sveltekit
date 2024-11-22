<script lang="ts">
  import { goto } from '$app/navigation';

  let title = '';
  let description = '';
  let error = '';

  async function handleSubmit(event: SubmitEvent) {
    event.preventDefault();
    const token = localStorage.getItem('token');

    try {
      const response = await fetch('http://localhost:3000/posts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ title, description })
      });

      if (response.ok) {
        goto('/');
      } else {
        const data = await response.json();
        error = data.error;
      }
    } catch (err) {
      error = 'เกิดข้อผิดพลาด กรุณาลองใหม่อีกครั้ง';
    }
  }
</script>

<div class="container mx-auto px-4 py-8">
  <div class="max-w-2xl mx-auto">
    <div class="bg-white rounded-xl shadow-lg p-6">
      <h1 class="text-2xl font-bold text-gray-900 mb-6">Create New Post</h1>
      
      <form on:submit={handleSubmit} class="space-y-6">
        {#if error}
          <div class="text-red-500 text-sm">{error}</div>
        {/if}

        <div>
          <label for="title" class="block text-sm font-medium text-gray-700 mb-1">Title</label>
          <input
            type="text"
            id="title"
            bind:value={title}
            required
            class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            placeholder="Enter post title"
          />
        </div>

        <div>
          <label for="description" class="block text-sm font-medium text-gray-700 mb-1">Description</label>
          <textarea
            id="description"
            bind:value={description}
            required
            rows="4"
            class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            placeholder="Enter post description"
          ></textarea>
        </div>

        <div class="flex justify-end space-x-4">
          <a 
            href="/"
            class="px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900">
            Cancel
          </a>
          <button
            type="submit"
            class="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition duration-150">
            Create Post
          </button>
        </div>
      </form>
    </div>
  </div>
</div> 