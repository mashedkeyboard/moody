import { DecryptionError } from "$lib/errors/DecryptionError";
import { NotOpenError } from "$lib/errors/NotOpenError";
import type { MoodLogStore } from "$lib/interfaces/MoodLogStore";
import type { MoodLogStoreIndex } from "$lib/interfaces/MoodLogStoreIndex";
import type { KnownPrecisionDate } from "$lib/models/KnownPrecisionDate";
import type { MoodLog } from "$lib/models/MoodLog";
import { Crypt } from "$lib/util/Crypt";
import { MoodLogSerializer } from "$lib/util/MoodLogSerializer";
import _ from "lodash";

/**
 * LocalStorageStore is a simple MoodLogStore based on the browser's LocalStorage API.
 */
export class LocalStorageStore implements MoodLogStore {
    private crypt: Crypt;
    private loadedIndex: MoodLogStoreIndex | null = null;

    /**
     * Creates a new LocalStorageStore for MoodLogs.
     * @param password a password to use to encrypt the data held in local storage.
     */
    constructor (password: string) {
        this.crypt = new Crypt(password);
    }
    
    open() {
        let index = localStorage.getItem("index");
        if (!index) {
            this.loadedIndex = {};
            return true; // empty
        }

        index = this.crypt.decrypt(index);
        if (!index) throw new DecryptionError();
        
        this.loadedIndex = LocalStorageStore.deserializeIndex(index);
        return true;
    }

    close() {
        this.loadedIndex = null;
        return true;
    }

    list() {
        if (!this.isOpen()) throw new NotOpenError;
        return this.loadedIndex!;
    }

    search(date: KnownPrecisionDate) {
        if (!this.isOpen()) throw new NotOpenError;

        let monthList = this.list()![date.getFullYear()]?.[date.getMonth()];

        if (monthList && date.hasDate) {

            _.filter(monthList, function(log) {
                log.datetime.getDate() == date.getDate();
            });

            if (date.hasHour) {
                _.filter(monthList, function(log) {
                    log.datetime.getDate() == date.getDate();
                });

                if (date.hasMinutes) {
                    _.filter(monthList, function(log) {
                        log.datetime.getDate() == date.getDate();
                    });
                }
            }
        }

        return monthList || [];
    }

    delete(log: MoodLog) {
        if (!this.isOpen()) throw new NotOpenError;

        let month = this.loadedIndex![log.datetime.getFullYear()]?.[log.datetime.getMonth()];

        if (month) {
            let removed = _.remove(month, ((l: MoodLog) => l.getID() == log.getID()));
            if (removed.length > 0) {
                this.persistIndex();
                return true;
            }
        }

        return false;
    }

    save(log: MoodLog) {
        if (!this.isOpen()) throw new NotOpenError;

        let year = this.loadedIndex![log.datetime.getFullYear()];
        if (!year) this.loadedIndex![log.datetime.getFullYear()] = {};
        let month = this.loadedIndex![log.datetime.getFullYear()][log.datetime.getMonth()];
        if (!month) this.loadedIndex![log.datetime.getFullYear()][log.datetime.getMonth()] = [];

        this.loadedIndex![log.datetime.getFullYear()][log.datetime.getMonth()].push(log);

        this.persistIndex();

        return true;
    }

    isOpen() {
        return this.loadedIndex !== null;
    }

    /**
     * Clears the store entirely.
     * Intended for use in testing.
     */
    clear() {
        this.loadedIndex = {};
        this.persistIndex();
    }

    /**
     * Persists the index to the LocalStorage API.
     */
    private persistIndex() {
        localStorage.setItem("index", this.crypt.encrypt(LocalStorageStore.serializeIndex(this.loadedIndex!)));
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

}