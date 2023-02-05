<script lang="ts">
	import type { Mood } from "../models/Mood";
    import {moods} from "$lib/MoodLibrary";
    import Button from "$lib/components/Button.svelte";
    import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher();

    function selectMood(mood: Mood) {
        dispatch('moodSelect', mood);
    }
</script>

<div>
    {#each moods as mood}
    <Button className="round large" on:click={e => selectMood(mood)}>{mood.icon}</Button>
    {/each}
</div>

<style lang="scss">
    div {
        display: flex;
        justify-content: center;
        flex-wrap: wrap;
        gap: 1em;
    }
</style>