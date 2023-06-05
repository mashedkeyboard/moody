import { activeStore } from '$lib/components/stores/ActiveStore';
import { error, redirect } from '@sveltejs/kit';
import { get } from 'svelte/store';
import type { LayoutLoad } from './$types';

export const load = (() => {
    if (!get(activeStore)?.isOpen()) {
        throw redirect(307, '/login')
    }
}) satisfies LayoutLoad;