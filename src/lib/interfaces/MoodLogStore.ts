import type { KnownPrecisionDate } from "$lib/models/KnownPrecisionDate";
import type { Readable } from "svelte/store";
import type { MoodLog } from "../models/MoodLog";
import type { MoodLogStoreIndex } from "./MoodLogStoreIndex";

/** 
 * A MoodLogStore is a location for storing MoodLogs.
 * In order to maintain reactivity in the application, MoodLogs **should** advertise Svelte stores for reading moods.
 */
export interface MoodLogStore {
    /**
     * isOpen represents whether the store has been opened for access.
     * @returns true if the store is open; false otherwise.
     */
    isOpen: () => boolean;

    /**
     * open allows the store to be attempted to be opened for access.
     * @returns true if the store was opened; false otherwise.
     */
    open: () => boolean;

    /**
     * close closes the store for access.
     */
    close: () => void;

    /**
     * list gets a list of all MoodLogs in the MoodLogStore.
     * @returns a {@link Readable} store of an {@link MoodLogStoreIndex} of all the MoodLogs in the MoodLogStore.
     */
    list: () => Readable<MoodLogStoreIndex>;

    /**
     * search gets MoodLogs from the MoodLogStore that match the date specified.
     * @param date a {@link KnownPrecisionDate} with precision for the search.
     * @returns a {@link Readable} store of the found {@link MoodLog}s that match.
     */
    search: (date: KnownPrecisionDate) => Readable<MoodLog[]>;

    /**
     * delete removes a MoodLog from the MoodLogStore.
     * @param log the MoodLog to be removed
     * @returns true if it was removed or false otherwise
     */
    delete: (log: MoodLog) => boolean;

    /**
     * save saves a MoodLog to the MoodLogStore.
     * @param log the MoodLog to save
     * @returns true if it was persisted or false otherwise
     */
    save: (log: MoodLog) => boolean;
}