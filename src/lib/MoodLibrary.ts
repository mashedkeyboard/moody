import { Mood } from "$lib/models/Mood";

/** The default moods in the application. */
let moods = [new Mood(5, "😃"), new Mood(4, "🙂"), new Mood(3, "😐"), new Mood(2, "🙁"), new Mood(1, "😭")];

/** Gets a mood by its ID. */
function getMoodById(id: number) : Mood | null {
    let foundMood : Mood | null = null;

    moods.forEach(function (mood) {
        if (mood.id == id) foundMood = mood;
    });

    return foundMood;
}

export {moods, getMoodById};
