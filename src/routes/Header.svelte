<script>
	import { activeStore } from "$lib/components/stores/ActiveStore";
</script>

<nav>
	<ul>
		<li><a href="/">Home</a></li>
		{#if $activeStore?.isOpen()}
		<li><a href="/log">Log</a></li>
		<!-- <li><a href="/moods">Moods</a></li> -->
		{/if}
	</ul>
	<ul>
		{#if $activeStore?.isOpen()}
		<li><a href="/logout">Logout</a></li>
		{/if}
	</ul>
</nav>

<style lang="scss">
	nav {
		display: flex;
		justify-content: space-between;

		ul {
			list-style: none;
			gap: 1em;
			display: inline-flex;
			font-weight: bold;
			text-transform: lowercase;
			font-size: 1.2em;
			&:last-child {
				margin-right: 2em;
			}
		}
	}
</style>
