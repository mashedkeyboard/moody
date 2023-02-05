<script>
	import { goto } from '$app/navigation';
	import MoodSelector from '$lib/components/MoodSelector.svelte';
</script>

<div class="moodSelectorContainer">
    <h1 class="text-5xl font-bold text-white">How are you feeling today?</h1>
    <MoodSelector on:moodSelect={(moodEvent) => goto(`/log/${moodEvent.detail.id}`)} />
</div>

<style lang="scss">
    .moodSelectorContainer {
        background: #202020;
        padding: 1em;
        border-radius: 1em;
        text-align: center;
    }
</style>