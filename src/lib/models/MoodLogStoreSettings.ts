import type { MoodLogStoreSettingsConfig } from "$lib/interfaces/MoodLogStoreSettingsConfig";

/*
 * MoodLogStoreSettings stores a MoodLogStore's settings.
 * It is defined by the type parameter passed to the constructor, which contains
 * the settings available and their defaults.
 */
export class MoodLogStoreSettings<O extends MoodLogStoreSettingsConfig> {
    private availableSettings : O;

    private settings: Record<keyof O, string> = {} as Record<keyof O, string>;

    /* 
     * Creates a MoodLogStoreSettings.
     * @param storeSettings the settings available for this MoodLogStore.
     * @return the settings object
     */
    constructor(storeSettings: O) {
        this.availableSettings = storeSettings;

        Object.entries(this.availableSettings).forEach((settingsEntry) => {
            this.settings[settingsEntry[0] as keyof O] = settingsEntry[1].default;
        });
    }

    /* 
     * Gets a setting from the settings.
     * @param key the key of the setting to look up.
     * @return the setting value.
     */
    get(key: keyof O) {
        return this.settings[key];
    }

    /* 
     * Sets a setting in the settings.
     * @param key the key of the setting to look up.
     * @param value the new value of the setting.
     */
    set(key: keyof O, value: string) {
        this.settings[key] = value;
    }
}