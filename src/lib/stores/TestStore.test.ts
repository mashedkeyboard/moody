import type { MoodLogStoreIndex } from '$lib/interfaces/MoodLogStoreIndex';
import { KnownPrecisionDate } from '$lib/models/KnownPrecisionDate';
import { MoodLog } from '$lib/models/MoodLog';
import { moods } from '$lib/MoodLibrary';
import { Crypt } from '$lib/util/Crypt';
import { get } from 'svelte/store';
import { TestStore } from './TestStore';

let store = new TestStore();
let testLog = MoodLog.new(moods[0], 'test');

beforeEach(async () => {
    store.open();
    store.clear();
})

test('behaves like a LocalStorageStore', () => {
    store.save(testLog);
    expect(get(store.list())[testLog.datetime.getFullYear()][testLog.datetime.getMonth()]).toEqual([testLog]);
})

test('does not persist anything', () => {
    store.save(testLog);
    store.close();
    store.open();
    expect(get(store.list())).toEqual({});
})
