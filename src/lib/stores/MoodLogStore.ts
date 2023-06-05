import type { KnownPrecisionDate } from "$lib/models/KnownPrecisionDate";
import type { Readable } from "svelte/store";
import type { MoodLog } from "../models/MoodLog";
import type { MoodLogStoreIndex } from "../interfaces/MoodLogStoreIndex";
import { MoodLogStoreSettings } from "$lib/models/MoodLogStoreSettings";
import type { MoodLogStoreSettingsConfig } from "$lib/interfaces/MoodLogStoreSettingsConfig";
/** 
 * A MoodLogStore is a location for storing MoodLogs.
 * In order to maintain reactivity in the application, MoodLogs **should** advertise Svelte stores for reading moods.
 */
export abstract class MoodLogStore {
    protected settings: MoodLogStoreSettings<any>;

    constructor(settings: MoodLogStoreSettings<MoodLogStoreSettingsConfig>) {
        this.settings = settings;
    }

    /**
     * getName gets the name of the store for public use.
     * @returns the store name.
     */
    static getName(): string {
        throw new Error("MoodLogStore lacks a name");
    }

    /**
     * createSettings creates an {@link MoodLogStoreSettings} for this MoodLogStore.
     * @returns a MoodLogStoreSettings.
     */
    static createSettings<R extends MoodLogStoreSettingsConfig>(this: {getSettingsConfig(): R}): MoodLogStoreSettings<R> {
        return new MoodLogStoreSettings(this.getSettingsConfig());
    }

    /**
     * getName gets the settings the store has available.
     * @returns the store settings configuration.
     */
    static getSettingsConfig(): MoodLogStoreSettingsConfig {
        return {};
    }

    /**
     * getSettings returns a MoodLogStoreSettings for the store.
     * @returns a MoodLogStoreSettings
     */
    getSettings() {
        return this.settings;
    }

    /**
     * isOpen represents whether the store has been opened for access.
     * @returns true if the store is open; false otherwise.
     */
    abstract isOpen(): boolean;

    /**
     * open allows the store to be attempted to be opened for access.
     * @returns true if the store was opened; false otherwise.
     */
    abstract open(): boolean;

    /**
     * close closes the store for access.
     */
    abstract close(): void;

    /**
     * list gets a list of all MoodLogs in the MoodLogStore.
     * @returns a {@link Readable} store of an {@link MoodLogStoreIndex} of all the MoodLogs in the MoodLogStore.
     */
    abstract list(): Readable<MoodLogStoreIndex>;

    /**
     * search gets MoodLogs from the MoodLogStore that match the date specified.
     * @param date a {@link KnownPrecisionDate} with precision for the search.
     * @returns a {@link Readable} store of the found {@link MoodLog}s that match.
     */
    abstract search(date: KnownPrecisionDate): Readable<MoodLog[]>;

    /**
     * delete removes a MoodLog from the MoodLogStore.
     * @param log the MoodLog to be removed
     * @returns true if it was removed or false otherwise
     */
    abstract delete(log: MoodLog): boolean;

    /**
     * save saves a MoodLog to the MoodLogStore.
     * @param log the MoodLog to save
     * @returns true if it was persisted or false otherwise
     */
    abstract save(log: MoodLog): boolean;
}