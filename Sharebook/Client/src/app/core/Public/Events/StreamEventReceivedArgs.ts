// Event informing that a message was received
export class StreamEventReceivedArgs {
  constructor(json: string) {
    this.Json = json;
  }

  public Json: string;
}
