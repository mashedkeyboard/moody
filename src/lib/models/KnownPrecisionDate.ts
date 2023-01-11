/** KnownPrecisionDate is the same as a Date, but will tell us whether it was given exact values for each optional component. */
export class KnownPrecisionDate extends Date {
    hasDate: boolean = false;
    hasHour: boolean = false;
    hasMinutes: boolean = false;
    hasSeconds: boolean = false;
    hasMilliseconds: boolean = false;
    
    constructor(year: number, monthIndex: number, date?: number, hours?: number, minutes?: number, seconds?: number, ms?: number) {
        super(year, monthIndex);

        if (date) {
            this.hasDate = true;
            this.setDate(date);

            if (hours) {
                this.hasHour = true;
                this.setHours(hours);

                if (minutes) {
                    this.hasMinutes = true;
                    this.setMinutes(minutes);

                    if (seconds) {
                        this.hasSeconds = true;
                        this.setSeconds(seconds);

                        if (ms) {
                            this.hasMilliseconds = true;
                            this.setMilliseconds(ms);
                        }
                    }
                }
            }
        }
    }
}