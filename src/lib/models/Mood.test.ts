import { assertType, expectTypeOf } from 'vitest'
import { Mood } from '$lib/models/Mood'

test('moods need an icon', () => {
  // @ts-expect-error an icon should be required to create the mood
  assertType(new Mood())
})

test('moods have an icon and an id', () => {
  let mood = new Mood(0, "icon");
  expect(mood.id).toBe(0);
  expect(mood.icon).toBe("icon");
})