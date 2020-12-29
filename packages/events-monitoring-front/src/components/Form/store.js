
import { writable } from 'svelte/store';

export const form = writable({
  address: "",
  abi: "",
  email: ""
});
