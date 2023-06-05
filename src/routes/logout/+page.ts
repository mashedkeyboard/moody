import { activeStore } from '$lib/components/stores/ActiveStore';
import { redirect } from '@sveltejs/kit';
import { get } from 'svelte/store';
import type { LayoutLoad } from './$types';

export const load = (() => {
    get(activeStore)?.close();
    activeStore.update(aS => aS); // trigger reactivity
    throw redirect(303, '/login')
}) satisfies LayoutLoad;