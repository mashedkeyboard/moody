<script lang="ts">
	import { goto } from '$app/navigation';
	import { activeStore } from '$lib/components/stores/ActiveStore';
	import { MoodLog } from '$lib/models/MoodLog';
	import type { PageData } from './$types';
    import Button from "$lib/components/Button.svelte";

	let moodDescription: string;

	function submitMood() {
		$activeStore.save(MoodLog.new(data.mood, moodDescription));
		alert('Successfully saved');
		goto('/');
	}

	export let data: PageData;
</script>

<div class="log-container">
	<h1>What's got you feeling {data.mood.icon}?</h1>
    <form on:submit|preventDefault={submitMood}>
            <label id="label-description" for="description">
                Talk a bit about how you're feeling
            </label>
            <textarea
                id="description"
                class="textarea textarea-bordered h-48 rounded-b-none"
                placeholder="..."
                aria-labelledby="label-description"
                bind:value={moodDescription}
            />
            <Button type="submit" className="success">Log entry</Button>
    </form>
</div>

<style lang="scss">
    h1 {
        font-weight: bold;
    }
    textarea {
        width: 100%;
        margin: 1em 0;
        min-height: 5rem;
        background: none;
        border: 1px solid #f2f2f2;
        color: #ffffff;
        padding: 1em;
        font-family: var(--font-body);
        font-size: 1.1em;
    }
</style>