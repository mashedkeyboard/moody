import { goto } from '$app/navigation';
import { activeStore } from '$lib/components/stores/ActiveStore';
import { get } from 'svelte/store';
import type { LayoutLoad } from './$types';

export const load = (() => {
    if (get(activeStore)?.isOpen()) {
        goto('/log');
    }
}) satisfies LayoutLoad;