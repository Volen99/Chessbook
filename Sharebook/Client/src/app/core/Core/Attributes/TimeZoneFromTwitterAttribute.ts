export class TimeZoneFromTwitterAttribute  /*: Attribute*/ {
  public TZinfo: string;
  public displayValue: string;

  constructor(tzinfo: string, displayValue: string) {
    this.TZinfo = tzinfo;
    this.displayValue = displayValue;
  }
}
