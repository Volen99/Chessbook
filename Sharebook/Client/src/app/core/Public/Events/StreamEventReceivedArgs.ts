// Event informing that a message was received
export class StreamEventReceivedArgs {
  constructor(json: string) {
    this.json = json;
  }

  public json: string;
}
