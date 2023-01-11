import { getMoodById, moods } from '$lib/MoodLibrary';
import { error } from '@sveltejs/kit';
import type { PageLoad } from './$types';
 
export const load = (({ params }) => {
    let mood = getMoodById(parseInt(params.mood));
    if (mood) {
        return {
            mood: mood
        };
    }

    throw error(404, "Couldn't find that mood.");
}) satisfies PageLoad;