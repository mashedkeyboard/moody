import { InvalidFormatError } from "$lib/errors/InvalidFormatError";
import type { MoodLogStoreIndex } from "$lib/interfaces/MoodLogStoreIndex";
import { MoodLog } from "$lib/models/MoodLog";
import _ from "lodash";
import * as YAML from 'yaml';

export class MoodLogSerializer {
    /**
     * Serializes a MoodLog into a Markdown-type file.
     */
    static serialize(log: MoodLog) {
        return `---\n${YAML.stringify(log.getMetadata())}\n---\n${log.description}`;
    }

    /**
     * Deserializes a MoodLog from a Markdown-type file.
     */
    static deserialize(logString: string) {
        let log: MoodLog | null = null;
        let hasMetadata = false;

        let description = logString.replace(/^---\n(.*?)\n---/s, function(_, match) {
            let metadata = YAML.parse(match, (k: unknown, v: unknown) => (k === "date") ? new Date(v as string) : v);
            log = MoodLog.newFromMetadata(metadata);
            hasMetadata = true;
            return '';
        });

        if (!hasMetadata) throw new InvalidFormatError("No metadata found for this log");
        log!.description = description.trim();

        return log!;
    }
}