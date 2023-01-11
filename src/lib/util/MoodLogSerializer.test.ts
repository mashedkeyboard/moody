import { MoodLog } from "$lib/models/MoodLog"
import { moods } from "$lib/MoodLibrary"
import { MoodLogSerializer } from "./MoodLogSerializer";

test('can serialize and deserialize OK', () => {
    let log = MoodLog.new(moods[0], '');
    let serialized = MoodLogSerializer.serialize(log);
    expect(MoodLogSerializer.deserialize(serialized)).toEqual(log);
})