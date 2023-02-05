import type { MoodLog } from "$lib/models/MoodLog"

export interface MoodLogStoreIndex {
    [year: string]: {
        [month: string]: MoodLog[]
    }
};