<script lang="ts">
	import type { Mood } from "../models/Mood";
    import {moods} from "$lib/MoodLibrary";
    import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher();

    function selectMood(mood: Mood) {
        dispatch('moodSelect', mood);
    }
</script>

<div class="flex flex-wrap justify-center align-center p-10 gap-3">
    {#each moods as mood}
    <button class="btn btn-circle btn-lg text-4xl" on:click={e => selectMood(mood)}>{mood.icon}</button>
    {/each}
</div>