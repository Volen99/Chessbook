export interface IQuickReplyOption {
  // The text label displayed on the button face. Label text is returned as the user's message response.
  label: string;

  // Description text displayed under label text.
  description: string;

  // Metadata that will be sent back in the webhook request.
  metadata: string;
}
