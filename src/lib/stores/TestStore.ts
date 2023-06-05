import { writable } from "svelte/store";
import { LocalStorageStore } from "$lib/stores/LocalStorageStore";
import type { MoodLogStoreSettings } from "$lib/models/MoodLogStoreSettings";

/**
 * TestStore is a MoodLogStore with absolutely no backing.
 * It essentially operates as a LocalStorageStore without the local storage backend.
 * It always has the same password.
 */
export class TestStore extends LocalStorageStore {
    settings;

    constructor() {
        let settings = LocalStorageStore.createSettings();
        settings.set("password", "test");
        super(settings);
        this.settings = settings;
    }
    
    static getName() {
        return "Test storage";
    }

    open() {
        this._loadedIndex = writable({});
        return true;
    }
}