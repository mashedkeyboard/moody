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
			goto('/log');
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
				<h1 class="text-5xl font-bold">Welcome to moody</h1>
			</div>
			<div class="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
				<div class="card-body">
					<form on:submit={(e) => {e.preventDefault(); tryLogin()}}>
						<div class="form-control">
							<label class="label" for="provider">
								<span class="label-text">Provider</span>
							</label>
							<select bind:value={selectedStoreIdx} id="provider">
								<option disabled selected>Select one...</option>
								{#each stores as store, idx}
									<option value={idx}>
										{store.getName()}
									</option>
								{/each}
							</select>
						</div>
						{#if selectedStore}
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
						{/if}
						<div class="form-control mt-6">
							<button class="btn btn-primary" type="submit">Login</button>
						</div>
					</form>
				</div>
			</div>
		</div>
	</div>
</section>

<style>
</style>
