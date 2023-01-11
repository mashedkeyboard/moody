import { assertType, expectTypeOf } from 'vitest'
import { KnownPrecisionDate } from './KnownPrecisionDate';

test('KnownPrecisionDates need to be constructed with arguments', () => {
    // @ts-expect-error a set of arguments are needed for known precision
    assertType(new KnownPrecisionDate())
})

test('correctly identifies year-month precision', () => {
    let date = new KnownPrecisionDate(2022, 1);
    expect(date.hasDate).toBe(false);
    expect(date.getFullYear()).toBe(2022);
    expect(date.getMonth()).toBe(1);
})

test('correctly identifies year-month-day precision', () => {
    let date = new KnownPrecisionDate(2022, 1, 1);
    expect(date.hasDate).toBe(true);
    expect(date.hasHour).toBe(false);
    expect(date.getFullYear()).toBe(2022);
    expect(date.getMonth()).toBe(1);
    expect(date.getDate()).toBe(1);
})

test('correctly identifies hour precision', () => {
    let date = new KnownPrecisionDate(2022, 1, 1, 1);
    expect(date.hasDate).toBe(true);
    expect(date.hasHour).toBe(true);
    expect(date.hasMinutes).toBe(false);
})

test('correctly identifies minute precision', () => {
    let date = new KnownPrecisionDate(2022, 1, 1, 1, 1);
    expect(date.hasDate).toBe(true);
    expect(date.hasHour).toBe(true);
    expect(date.hasMinutes).toBe(true);
    expect(date.hasSeconds).toBe(false);
})

test('correctly identifies second precision', () => {
    let date = new KnownPrecisionDate(2022, 1, 1, 1, 1, 1);
    expect(date.hasDate).toBe(true);
    expect(date.hasHour).toBe(true);
    expect(date.hasMinutes).toBe(true);
    expect(date.hasSeconds).toBe(true);
    expect(date.hasMilliseconds).toBe(false);
})

test('correctly identifies millisecond precision', () => {
    let date = new KnownPrecisionDate(2022, 1, 1, 1, 1, 1, 1);
    expect(date.hasDate).toBe(true);
    expect(date.hasHour).toBe(true);
    expect(date.hasMinutes).toBe(true);
    expect(date.hasSeconds).toBe(true);
    expect(date.hasMilliseconds).toBe(true);
})