import type { Mood } from "./Mood";
import { v4 as uuidv4 } from 'uuid';
import { moods } from "$lib/MoodLibrary";
import { InvalidFormatError } from "$lib/errors/InvalidFormatError";

/**
 * A MoodLog is a log of a mood at a particular time, optionally accompanied by a description.
 */
export class MoodLog {
    mood: Mood;
    description: string;
    datetime: Date;
    private id: string;

    private constructor (mood: Mood, description: string, datetime?: Date, id?: string) {
        this.id = id || uuidv4();
        this.mood = mood;
        this.description = description;
        this.datetime = datetime || new Date();
    }

    /** getFileName gets a name for the MoodLog for storage purposes. */
    getFileName() {
        return `${this.datetime.getDay()} @ ${this.datetime.getHours()}:${this.datetime.getMinutes()} [${this.id}]`;
    }

    /** getID gets the ID of the MoodLog. */
    getID() {
        return this.id;
    }

    /** Returns metadata for serialization about this MoodLog. */
    getMetadata() {
        return {
            id: this.id,
            date: this.datetime,
            mood: this.mood.id
        };
    }

    /** Creates a new MoodLog with the given parameters. */
    static new(mood: Mood, description: string, datetime?: Date) {
        return new MoodLog(mood, description, datetime);
    }

    /**
     * Creates a new MoodLog with the given metadata.
     * Note that MoodLogs created in this way will not have a description, as that should be loaded separately.
     * @param metadata the metadata returned from {@link getMetadata}
     * @returns a new MoodLog
     */
    static newFromMetadata(metadata: {id: string, date: Date, mood: number}) {
        let mood = moods.find((m) => m.id == metadata.mood);
        if (!mood) throw new InvalidFormatError("No mood found for ID " + metadata.mood);
        return new MoodLog(mood, '', metadata.date, metadata.id);
    }
}