import { TestStore } from "$lib/stores/TestStore";
import { LocalStorageStore } from "$lib/stores/LocalStorageStore";
import type { MoodLogStore } from "$lib/stores/MoodLogStore"

/**
 * stores contains a list of MoodLogStores. Add new ones here.
 */
const stores = [
    LocalStorageStore
];

/**
 * getStores returns a list of all of the supported MoodLogStores.
 * @param test whether to include the TestStore. Defaults to false.
 * @returns a list of {@link MoodLogStore}s
 */
export default function getStores(test: boolean = false) {
    if (test == false) return stores;

    return [...stores, TestStore];
}