import Exception from "../../../c#-objects/TypeScript.NET-Core/packages/Core/source/Exception";

// Specifies the status of a network request.
export enum WebExceptionStatus {

  // No error was encountered.
  Success = 0,


  // The name resolver service could not resolve the host name.
  NameResolutionFailure = 1,


  // The remote service point could not be contacted at the transport level.
  ConnectFailure = 2,


  // A complete response was not received from the remote server.
  ReceiveFailure = 3,


  // A complete request could not be sent to the remote server.
  SendFailure = 4,


  PipelineFailure = 5,


  // The request was cancelled.
  RequestCanceled = 6,


  // The response received from the server was complete but indicated a
  // protocol-level error. For example, an HTTP protocol error such as 401 Access
  // Denied would use this status.
  ProtocolError = 7,


  // The connection was prematurely closed.
  ConnectionClosed = 8,


  // A server certificate could not be validated.
  TrustFailure = 9,


  // An error occurred in a secure channel link.
  SecureChannelFailure = 10,

  // <para>[To be supplied.]</para>
  ServerProtocolViolation = 11,

  // <para>[To be supplied.]</para>
  KeepAliveFailure = 12,

  // <para>[To be supplied.]</para>
  Pending = 13,

  // <para>[To be supplied.]</para>
  Timeout = 14,

  // Similar to NameResolution Failure, but for proxy failures.
  ProxyNameResolutionFailure = 15,

  // <para>[To be supplied.]</para>
  UnknownError = 16,

  // Sending the request to the server or receiving the response from it,
  // required handling a message that exceeded the specified limit.
  MessageLengthLimitExceeded = 17,

  // A request could be served from Cache but was not found and effective CachePolicy=CacheOnly
  CacheEntryNotFound = 18,

  // A request is not suitable for caching and effective CachePolicy=CacheOnly
  RequestProhibitedByCachePolicy = 19,

  // The proxy script (or other proxy logic) declined to provide proxy info, effectively blocking the request.
  RequestProhibitedByProxy = 20,

  // !! If new values are added, increase the size of the s_Mapping array below to the largest value + 1.
} // enum WebExceptionStatus

// Mapping from enum value to error message.
export abstract class WebExceptionMapping {
  private static readonly s_Mapping: string[] = new Array<string>(21);

  public static GetWebStatusString(status: WebExceptionStatus): string {
    let statusInt: number = status as number;
    if (statusInt >= this.s_Mapping.length || statusInt < 0) {
      throw new Exception("InternalException()"); // InternalException();
    }

    let message: string = "Volatile.Read(ref this.s_Mapping[statusInt]);"; // Volatile.Read(ref s_Mapping[statusInt]);
    if (message == null) {
      message = "net_webstatus_" + status.toString();
      // Volatile.Write(ref s_Mapping[statusInt], message);
    }
    return message;
  }
}
