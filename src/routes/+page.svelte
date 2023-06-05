<script lang="ts">
	import { activeStore } from '$lib/components/stores/ActiveStore';
    import Button from '$lib/components/Button.svelte';
	import type { MoodLog } from '$lib/models/MoodLog';

    let moodLogs = $activeStore.list();

    function deleteLog(log: MoodLog) {
        if (confirm("Are you sure you want to delete " + log.datetime.toLocaleString("en-GB", {weekday: 'long'}) +"'s mood?")) {
            $activeStore.delete(log);
        }
    }
</script>

<h1>Your mood diary</h1>
<div class="moodList">
	{#each Object.keys($moodLogs) as moodYear}
		<h2 class="divider heavy">{moodYear}</h2>
        {#each Object.keys($moodLogs[moodYear]).sort(function(a, b){return parseInt(b) - parseInt(a)}) as moodMonth}
            <h3 class="divider">{$moodLogs[moodYear][moodMonth][0].datetime.toLocaleString("en-GB", { month: "long" })}</h3>
            <div class="monthMoods">
                {#each $moodLogs[moodYear][moodMonth] as log}
                    <div>
                        <div class="header">
                            <div class="icon">{log.mood.icon}</div>
                            <span class="date">{log.datetime.toLocaleString("en-GB", { weekday: 'short', day: 'numeric', hour: 'numeric', minute: 'numeric' })}</span>
                        </div>
                        <p>{log.description}</p>
                        <div>
                            <Button className="danger small" on:click={() => deleteLog(log)} data={{"data-testid": "delete_" + log.getID()}}>Delete</Button>
                        </div>
                    </div>
                {/each}
            </div>
        {/each}
	{/each}
</div>

<style lang="scss">
    .moodList {
        display: flex;
        flex-direction: column;
    }

    .divider {
        width: 100%;
        font-weight: bold;
        display: flex;
        align-items: center;
        justify-content: center;

        &:before, &:after {
            border-top: 1px dashed #f5f5f5;
            flex: 1;
            margin: 1em;
            content: '';
        }

        &.heavy {
            font-style: italic;
            &:before, &.heavy:after {
                border-top-width: 2px;
            }
        }
    }

    .monthMoods {
        display: flex;
        gap: 1em;
        &> div {
            padding: 1em;
            background: #303030;

            .header {
                display: flex;
                flex-wrap: wrap;
                justify-content: space-between;
                gap: 3em;
            }
        }
    }
</style>