<script lang="ts">
	import { goto } from '$app/navigation';
	import { activeStore } from '$lib/components/stores/ActiveStore';
	import { MoodLog } from '$lib/models/MoodLog';
	import type { PageData } from './$types';

    let moodDescription: string;

    function submitMood() {
        $activeStore.save(MoodLog.new(data.mood, moodDescription));
        alert("Successfully saved");
        goto('/log');
    }

	export let data: PageData;
</script>

<div class="hero min-h-screen bg-base-200">
	<div class="hero-content text-center">
		<div class="max-w-md">
			<h1 class="font-bold text-white">What's got you feeling {data.mood.icon}?</h1>
            <div class="card bg-base-100 shadow-xl">
                <div class="card-body">
                    <!-- <h2 class="card-title">Card title!</h2> -->
                    <form on:submit|preventDefault={submitMood}>
                        <div class="form-control">
                            <label class="label" id="label-description" for="description">
                                <span class="label-text">Talk a bit about how you're feeling</span>
                            </label>
                            <textarea
                                id="description"
                                class="textarea textarea-bordered h-48 rounded-b-none"
                                placeholder="..."
                                aria-labelledby="label-description"
                                bind:value={moodDescription}
                            />
                        </div>
                        <div class="form-control">
                            <button class="btn btn-block btn-success rounded-t-none" type="submit">Log entry</button>
                        </div>
                    </form>
                </div>
              </div>
		</div>
	</div>
</div>
