import type { MoodLogStoreIndex } from '$lib/interfaces/MoodLogStoreIndex';
import { KnownPrecisionDate } from '$lib/models/KnownPrecisionDate';
import { MoodLog } from '$lib/models/MoodLog';
import { moods } from '$lib/MoodLibrary';
import { Crypt } from '$lib/util/Crypt';
import { LocalStorageStore } from './LocalStorageStore';

let password = "password";
let store = new LocalStorageStore(password);
let crypt = new Crypt(password);
let testLog = MoodLog.new(moods[0], 'test');

beforeEach(async () => {
    store.clear();
})

test('can open when local storage is empty', () => {
    localStorage.removeItem("index");
    expect(store.open()).toBe(true);
})

test('can open when local storage contains an index', () => {
    let testIndex : MoodLogStoreIndex = {
        2023: {
            1: [
                MoodLog.new(moods[0], "")
            ]
        }
    };

    let testSerializedIndex = LocalStorageStore.serializeIndex(testIndex);

    localStorage.setItem("index", crypt.encrypt(testSerializedIndex));
    
    expect(store.open()).toBe(true);
    expect(store.list()).toEqual(testIndex);
})

test('can save a mood log to the index', () => {
    expect(store.save(testLog)).toBeTruthy();
})

test('can retrieve saved mood logs from the index', () => {
    store.save(testLog);
    store.close();
    store.open();
    expect(store.list()[testLog.datetime.getFullYear()][testLog.datetime.getMonth()]).toEqual([testLog]);
})

test('can delete mood logs from the index', () => {
    store.save(testLog);
    store.close();
    store.open();
    expect(store.delete(testLog)).toBeTruthy();
    store.close();
    store.open();
    expect(store.list()[testLog.datetime.getFullYear()][testLog.datetime.getMonth()]).toEqual([]);
})

test('can search for a known precision date in the index', () => {
    store.save(testLog);

    let testLog2 = MoodLog.new(moods[0], 'test', new Date(2000, 1, 1, 1, 1, 1));
    store.save(testLog2);

    store.close();
    store.open();

    expect(store.search(new KnownPrecisionDate(testLog.datetime.getFullYear(), testLog.datetime.getMonth()))).toEqual([testLog]);
    
    expect(store.search(new KnownPrecisionDate(2000, 1, 1))).toEqual([testLog2]);
})