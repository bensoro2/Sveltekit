<script lang="ts">
  import { onMount } from 'svelte';
  import { user } from '$lib/stores/authStore';

  interface Post {
    id: number;
    title: string;
    description: string;
    createdAt: string;
    authorId: number; // Added authorId property
    author: {
      username: string;
    };
  }

  let posts: Post[] = [];
  let loading = true;

  onMount(async () => {
    try {
      const response = await fetch('http://localhost:3000/posts');
      posts = await response.json();
    } catch (error) {
      console.error('Error fetching posts:', error);
    } finally {
      loading = false;
    }
  });

  function formatDate(dateString: string) {
    return new Date(dateString).toLocaleDateString('th-TH', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  }

  async function handleDelete(postId: number) {
    if (!confirm('คุณแน่ใจหรือไม่ที่จะลบโพสต์นี้?')) return;

    const token = localStorage.getItem('token');
    try {
      const response = await fetch(`http://localhost:3000/posts/${postId}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        posts = posts.filter((post) => post.id !== postId);
      } else {
        const data = await response.json();
        alert(data.error || 'เกิดข้อผิดพลาดในการลบโพสต์');
      }
    } catch (error) {
      console.error('Error deleting post:', error);
      alert('เกิดข้อผิดพลาดในการลบโพสต์');
    }
  }
</script>

<main class="container mx-auto px-4 py-8">
  <div class="max-w-4xl mx-auto">
    {#if $user}
      <div class="mb-6">
        <a
          href="/posts/create"
          class="inline-flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition duration-150"
        >
          <svg
            class="w-5 h-5 mr-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M12 4v16m8-8H4"
            />
          </svg>
          Create New Post
        </a>
      </div>
    {/if}

    {#if loading}
      <div class="text-center py-8">
        <div
          class="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto"
        ></div>
      </div>
    {:else}
      <div class="space-y-6">
        {#each posts as post}
          <div
            class="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition duration-300"
          >
            <div class="flex justify-between items-start">
              <div class="flex-grow">
                <h2 class="text-xl font-semibold text-gray-900 mb-2">
                  {post.title}
                </h2>
                <p class="text-gray-600 mb-4">{post.description}</p>
                <div class="text-sm text-gray-500 space-y-1">
                  <div>Posted by {post.author.username}</div>
                  <div>Created at {formatDate(post.createdAt)}</div>
                </div>
              </div>
              {#if $user && Number($user.id) === post.authorId}
                <div class="flex space-x-2 ml-4">
                  <a
                    href={`/posts/${post.id}/edit`}
                    class="text-indigo-600 hover:text-indigo-800 p-2"
                    aria-label="Edit Post"
                  >
                    <svg
                      class="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M11 5H6a2 2 0 00-2 2v11a2 2
                        0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2
                        0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                      />
                    </svg>
                  </a>
                  <button
                    on:click={() => handleDelete(post.id)}
                    class="text-red-600 hover:text-red-800 p-2"
                    aria-label="Delete Post"
                  >
                    <svg
                      class="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M19 7l-.867 12.142A2 2 0
                        0116.138 21H7.862a2 2 0 01-1.995-1.858L5
                        7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0
                        00-1 1v3M4 7h16"
                      />
                    </svg>
                  </button>
                </div>
              {/if}
            </div>
          </div>
        {/each}
      </div>
    {/if}
  </div>
</main>