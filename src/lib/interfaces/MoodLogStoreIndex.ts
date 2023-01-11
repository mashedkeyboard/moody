import type { MoodLog } from "$lib/models/MoodLog"

export interface MoodLogStoreIndex {
    [year: number]: {
        [month: number]: MoodLog[]
    }
};