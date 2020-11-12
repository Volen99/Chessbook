// Tweetinvi received a message that it did not understood
export class UnsupportedMessageReceivedEvent {
  constructor(message: string) {
    this.message = message;
  }

  public message: string;
}
