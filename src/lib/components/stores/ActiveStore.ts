import type { MoodLogStore } from "$lib/stores/MoodLogStore";
import { writable } from "svelte/store";

export const activeStore = writable<MoodLogStore>();