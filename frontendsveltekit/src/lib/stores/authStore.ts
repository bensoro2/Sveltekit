import { writable, derived } from 'svelte/store';

interface User {
  id: string;
  username: string;
  email: string;
}

export const user = writable<User | null>(null);

export const isAuthenticated = derived(user, $user => $user !== null); 