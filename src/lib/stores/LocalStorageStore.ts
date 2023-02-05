import { DecryptionError } from "$lib/errors/DecryptionError";
import { NotOpenError } from "$lib/errors/NotOpenError";
import type { MoodLogStore } from "$lib/interfaces/MoodLogStore";
import type { MoodLogStoreIndex } from "$lib/interfaces/MoodLogStoreIndex";
import type { KnownPrecisionDate } from "$lib/models/KnownPrecisionDate";
import type { MoodLog } from "$lib/models/MoodLog";
import { Crypt } from "$lib/util/Crypt";
import { MoodLogSerializer } from "$lib/util/MoodLogSerializer";
import _ from "lodash";
import { derived, writable, type Writable } from "svelte/store";

/**
 * LocalStorageStore is a simple MoodLogStore based on the browser's LocalStorage API.
 */
export class LocalStorageStore implements MoodLogStore {
    private crypt: Crypt;
    protected _loadedIndex: Writable<MoodLogStoreIndex> | null = null;

    /**
     * Creates a new LocalStorageStore for MoodLogs.
     * @param password a password to use to encrypt the data held in local storage.
     */
    constructor(password: string) {
        this.crypt = new Crypt(password);
    }

    open() {
        let index = localStorage.getItem("index");

        if (!index) {
            this._loadedIndex = writable({});
        } else {
            index = this.crypt.decrypt(index);
            if (!index) throw new DecryptionError();
    
            this._loadedIndex = writable(LocalStorageStore.deserializeIndex(index));
        }

        // Persist the index when it updates
        this._loadedIndex!.subscribe(LocalStorageStore.persistIndex(this.crypt));

        return true;
    }

    close() {
        this._loadedIndex = null;
        return true;
    }

    list() {
        if (!this.isOpen()) throw new NotOpenError;
        return {
            subscribe: this._loadedIndex!.subscribe
        };
    }

    search(date: KnownPrecisionDate) {
        if (!this.isOpen()) throw new NotOpenError;

        return derived(this._loadedIndex!, function($index) {
            let monthList = $index[date.getFullYear()]?.[date.getMonth()];

            if (monthList && date.hasDate) {

                _.filter(monthList, function (log) {
                    log.datetime.getDate() == date.getDate();
                });

                if (date.hasHour) {
                    _.filter(monthList, function (log) {
                        log.datetime.getDate() == date.getDate();
                    });

                    if (date.hasMinutes) {
                        _.filter(monthList, function (log) {
                            log.datetime.getDate() == date.getDate();
                        });
                    }
                }
            }

            return monthList || [];
        });
    }

    delete(log: MoodLog) {
        if (!this.isOpen()) throw new NotOpenError;

        let removed = [];

        this._loadedIndex!.update(function (index) {
            let month = index[log.datetime.getFullYear()]?.[log.datetime.getMonth()];

            if (month) {
                removed = _.remove(index[log.datetime.getFullYear()]?.[log.datetime.getMonth()], ((l: MoodLog) => l.getID() == log.getID()));
                // if the month is now empty, remove it from the "filesystem" so to speak
                if (index[log.datetime.getFullYear()][log.datetime.getMonth()].length == 0) {
                    delete index[log.datetime.getFullYear()][log.datetime.getMonth()];
                }
            }

            return index;
        });

        return removed.length > 0;
    }

    save(log: MoodLog) {
        if (!this.isOpen()) throw new NotOpenError;

        this._loadedIndex!.update(function (index) {
            let year = index[log.datetime.getFullYear()];
            if (!year) index[log.datetime.getFullYear()] = {};
            let month = index[log.datetime.getFullYear()][log.datetime.getMonth()];
            if (!month) index[log.datetime.getFullYear()][log.datetime.getMonth()] = [];

            index[log.datetime.getFullYear()][log.datetime.getMonth()].push(log);

            return index;
        });

        return true;
    }

    isOpen() {
        return this._loadedIndex !== null;
    }

    /**
     * Clears the store entirely.
     * Intended for use in testing.
     */
    clear() {
        if (!this.isOpen()) throw new NotOpenError;

        this._loadedIndex!.set({});
    }

    /**
     * Serializes a MoodLogStoreIndex to JSON.
     * @param index the index to serialize
     * @returns the JSON it's been serialized to
     */
    static serializeIndex(index: MoodLogStoreIndex) {
        return JSON.stringify(_.mapValues(index, year => _.mapValues(year, month => _.map(month, log => MoodLogSerializer.serialize(log)))));
    }

    /**
     * Deserializes a MoodLogStoreIndex from JSON.
     * @param strIndex the string to deserialize
     * @returns the {@link MoodLogStoreIndex}
     */
    static deserializeIndex(strIndex: string) {
        return _.mapValues(JSON.parse(strIndex), year => _.mapValues(year, month => _.map(month, log => MoodLogSerializer.deserialize(log))));
    }

    /**
     * Returns a function to persist the index given to the LocalStorage API.
     * Intended for use with subscription to the loadedIndex.
     * @param crypt the {@link Crypt} instance currently in use, configured with a password.
     */
    private static persistIndex(crypt: Crypt) {
        return (index: MoodLogStoreIndex) => localStorage.setItem("index", crypt.encrypt(LocalStorageStore.serializeIndex(index)));
    }
}