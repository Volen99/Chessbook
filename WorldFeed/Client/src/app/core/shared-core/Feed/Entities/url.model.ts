export interface Url {
                                                                                                          // "url":"https://t.co/yzocNFvJuL"
  url: string; // Wrapped URL, corresponding to the value embedded directly into the raw Tweet text, & the values for the indices parameter
  displayUrl: string; // URL pasted/typed into Tweet: "display_url":"bit.ly/2so49n2"
  expandedUrl: string; // Expanded version of `` display_url``: "expanded_url":"http://bit.ly/2so49n2"
  indices: [];

  // If you are using the Expanded and/or Enhanced URL enrichments, the following metadata is available under the unwound attribute

  unwound: {
    url: string; // The fully unwound version of the link included in the Tweet
    status: number; // Final HTTP status of the unwinding process, a '200' indicating success
    title: string; // HTML title for the link. Example
    description: string; // HTML description for the link
  };
}
