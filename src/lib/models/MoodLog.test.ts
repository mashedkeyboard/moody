import { assertType, expectTypeOf } from 'vitest'
import { Mood } from '$lib/models/Mood'
import { MoodLog } from '$lib/models/MoodLog'
import * as moodLibrary from '$lib/MoodLibrary';

let referenceMood = new Mood(0, "icon");

test('moodlogs need a mood', () => {
  // @ts-expect-error a mood should be required
  assertType(MoodLog.new())
})

test('moodlogs can be created with a mood and a description', () => {
  const date = new Date();

  vi.useFakeTimers()
  vi.setSystemTime(date)

  let desc = "test description";

  let log = MoodLog.new(referenceMood, desc);
  expect(log.mood).toBe(referenceMood);
  expect(log.description).toBe(desc);
  expect(log.datetime).toEqual(date);

  vi.useRealTimers()
})

test('moodlogs can be created with a mood, a description and a datetime', () => {
  const ourDate = new Date(2023, 1, 1, 23, 44, 37);

  let desc = "test description";

  let log = MoodLog.new(referenceMood, desc, ourDate);
  expect(log.mood).toBe(referenceMood);
  expect(log.description).toBe(desc);
  expect(Date()).not.toBe(ourDate);
  expect(log.datetime).toEqual(ourDate);
})

test('moodlogs automatically get a unique ID', () => {
  let ids = new Set();
  for (let i = 0; i < 10_000; i++) {
    let log = MoodLog.new(referenceMood, "");
    expect(ids.has(log.getID())).toBeFalsy();
    ids.add(log.getID());
  }
})

test('moodlogs have file names', () => {
  let log = MoodLog.new(referenceMood, "");
  expectTypeOf(log.getFileName()).toBeString();
  expect(log.getFileName().length).toBeGreaterThan(0);
})

test('moodlogs have unique file names, even when set for the same date and time', () => {
  const ourDate = new Date(2023, 1, 1, 23, 44, 37);
  let log = MoodLog.new(referenceMood, "", ourDate);
  let log2 = MoodLog.new(referenceMood, "", ourDate);
  expect(log.getFileName()).not.toEqual(log2.getFileName());
})

test('moodlogs have metadata', () => {
  const ourDate = new Date(2023, 1, 1, 23, 44, 37);

  let desc = "test description";

  let log = MoodLog.new(referenceMood, desc, ourDate);

  expect(log.getMetadata()).toEqual({
    id: log.getID(),
    date: ourDate,
    mood: 0
  });
})

test('moodlogs can be made from metadata with no description', () => {
  const ourDate = new Date(2023, 1, 1, 23, 44, 37);

  vi.spyOn(moodLibrary, 'moods', 'get').mockReturnValue([referenceMood]);

  let log = MoodLog.newFromMetadata({
    id: 'test-id',
    date: ourDate,
    mood: 0
  });

  expect(log.getID()).toEqual('test-id');
  expect(log.mood).toBe(referenceMood);
  expect(log.datetime).toEqual(ourDate);
  expect(log.description).toEqual("");
})