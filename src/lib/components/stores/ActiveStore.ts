import type { MoodLogStore } from "$lib/interfaces/MoodLogStore";
import { writable } from "svelte/store";

export const activeStore = writable<MoodLogStore>();