
import { writable } from 'svelte/store';

export const watcher = writable({
  address: "",
  events: [],
  event: {},
  email: ""
});
