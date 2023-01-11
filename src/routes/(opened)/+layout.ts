import { activeStore } from '$lib/components/stores/ActiveStore';
import { error } from '@sveltejs/kit';
import { get } from 'svelte/store';
import type { LayoutLoad } from './$types';

export const load = (() => {
    if (!get(activeStore)?.isOpen()) {
        throw error(401, "No mood log store open");
    }
}) satisfies LayoutLoad;