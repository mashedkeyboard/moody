<script type="ts">
	import { goto } from "$app/navigation";
	import { activeStore } from "$lib/components/stores/ActiveStore";
	import { LocalStorageStore } from "$lib/stores/LocalStorageStore";

	let password : string;

	function tryLogin() {
		activeStore.set(new LocalStorageStore(password));
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
					<div class="form-control">
						<label class="label" for="password">
							<span class="label-text">Password</span>
						</label>
						<input type="password" placeholder="password" id="password" bind:value={password} on:keydown={(e) => e.key == "Enter" ? tryLogin() : 0} class="input input-bordered" />
					</div>
					<div class="form-control mt-6">
						<button class="btn btn-primary" on:click={tryLogin}>Login</button>
					</div>
				</div>
			</div>
		</div>
	</div>
</section>

<style>
</style>
