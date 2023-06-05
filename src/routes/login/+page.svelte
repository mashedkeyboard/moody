<script lang="ts">
	import { goto } from "$app/navigation";
	import { activeStore } from "$lib/components/stores/ActiveStore";
	import getStores from "$lib/stores";
	import type { MoodLogStoreSettings } from "$lib/models/MoodLogStoreSettings";
	import { page } from '$app/stores';

	const stores = getStores($page.url.searchParams.get("enableTest") ? true : false);
	
	let selectedStoreIdx : number;
	let selectedStore : typeof stores[number] | undefined;
	$: selectedStore = selectedStoreIdx == undefined ? undefined : stores[selectedStoreIdx];

	let settings : MoodLogStoreSettings<any> | undefined;
	$: settings = selectedStore?.createSettings();

	function tryLogin() {
		if (selectedStore == undefined) {
			alert("Provider required");
			return;
		}

		activeStore.set(new selectedStore(settings!));
		if ($activeStore.open()) {
			goto('/');
		} else {
			alert("Invalid password");
		}
	}
</script>

<svelte:head>
	<title>Moody</title>
	<!-- <meta name="description" content="" /> -->
</svelte:head>

<section>
	<div class="hero min-h-screen bg-base-200">
		<div class="hero-content flex-col lg:flex-row-reverse">
			<div class="text-center lg:text-left">
				<h1 class="text-5xl font-bold">Welcome to Moody</h1>
			</div>
			<div class="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
				<div class="card-body">
					<form on:submit={(e) => {e.preventDefault(); tryLogin()}}>
						<h2>Choose a storage provider</h2>
						<div>
							{#each stores as store, idx}
							<button class="provider" type="button" on:click={() => selectedStoreIdx = idx}>
								{store.getName()}
							</button>
							{/each}
						</div>
						<div class="selectedStoreInfo">
							{#if selectedStore}
							<div>
								<h2>Log in to your provider</h2>
								{#each Object.entries(selectedStore.getSettingsConfig()) as setting}
								<div class="form-control">
									<label class="label" for="{setting[0]}">
										<span class="label-text">{setting[0].replace(/^\w/, c => c.toUpperCase())}</span>
									</label>
									<input type="{setting[1]?.secure ? "password" : "text"}"
									placeholder="{setting[0]}" id={setting[0]}
									on:change={(e) => settings?.set(setting[0], e.currentTarget.value)}
									class="input input-bordered" />
								</div>
								{/each}
							</div>
							<button type="submit">Login</button>
							{/if}
						</div>
					</form>
				</div>
			</div>
		</div>
	</div>
</section>

<style>
	h2 {
		font-size: 1.1em;
		font-weight: 500;
	}

	.provider {
		padding: 2.5em;
		background: #303030;
		color: #f2f2f2;
		text-align: left;
		font-weight: bold;
		font-size: 1.3em;
		border-bottom: none;
	}

	button[type="submit"] {
		padding: 1em;
		margin-top: 1em;
		background-color: #505050;
		color: #f2f2f2;

	}

	.selectedStoreInfo {
		border-top: 1px solid #f2f2f2;
		padding-left: 1em;
		border-left: 0.5em solid darkred;
	}
</style>
