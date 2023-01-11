<script>
	import { goto } from '$app/navigation';
	import MoodSelector from '$lib/components/MoodSelector.svelte';
</script>

<div class="hero min-h-screen bg-base-200">
    <div class="hero-content text-center">
        <div class="max-w-md">
            <h1 class="text-5xl font-bold text-white">How are you feeling today?</h1>
            <MoodSelector on:moodSelect={(moodEvent) => goto(`/log/${moodEvent.detail.id}`)} />
        </div>
    </div>
</div>