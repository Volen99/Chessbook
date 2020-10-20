export interface ITimeZone {
  // Timezone name.
  name: string;

  // Linux TZINFO name.
  tzinfoName: string;

  // Difference in time between UTC time and the Timezone time.
  utcOffset: number;
}
