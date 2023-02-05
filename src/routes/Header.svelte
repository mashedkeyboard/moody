<script>
	import { activeStore } from "$lib/components/stores/ActiveStore";
</script>

<nav>
	<ul>
		<li><a href="/">Home</a></li>
		{#if $activeStore?.isOpen()}
		<li><a href="/log">Log</a></li>
		<li><a href="/moods">Moods</a></li>
		{/if}
	</ul>
</nav>

<style lang="scss">
	ul {
		list-style: none;
		display: flex;
		gap: 1em;

		li {
			font-size: 1.2em;
		}
	}
</style>
