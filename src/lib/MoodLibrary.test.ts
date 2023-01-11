import { assertType, expectTypeOf } from 'vitest'
import type { Mood } from './models/Mood'
import { getMoodById, moods } from './MoodLibrary'

test('moodlibrary contains moods', () => {
    expectTypeOf(moods).toMatchTypeOf<Mood[]>()
})

test('moodlibrary can look up moods', () => {
    let mood = moods[0];
    expect(getMoodById(mood.id)).toBe(mood);
})

test('moodlibrary returns null for nonexistent moods', () => {
    expect(getMoodById(-1)).toBeNull();
})