import Uri from "typescript-dotnet-commonjs/System/Uri/Uri";

export interface IProxyConfig /*extends IWebProxy*/ {
  address: Uri;
}

export class ProxyConfig implements IProxyConfig {
  constructor(obj: any) {

  }

  address: Uri;
}

// export class ProxyConfig implements IProxyConfig {
//   private _proxyAddress: Uri;
//   private _networkCredentials: NetworkCredential;
//
//   constructor(proxyAddressOrUrlOrProxyConfig?: Uri | string | IProxyConfig, credentials: NetworkCredential = null, url?: string, proxyConfig?: IProxyConfig) {
//     if (url != null) {
//       new ProxyConfig(new Uri(url), credentials);
//     } else if (proxyConfig != null) {
//       this._proxyAddress = proxyConfig.address;
//
//       let networkCredentials = proxyConfig.Credentials as NetworkCrede  ntial;
//       if (networkCredentials != null) {
//         Credentials = new NetworkCredential(networkCredentials.UserName, networkCredentials.Password, networkCredentials.Domain);
//       }
//     } else {
//       this._proxyAddress = proxyAddress;
//       Credentials = credentials;
//     }
//   }
//
//   get Credentials(): ICredentials {
//     return this._networkCredentials;
//   }
//
//   set Credentials(value: ICredentials) {
//     let isCompatibleWithTweetinvi = value == null || value instanceof NetworkCredential;  // is
//     if (isCompatibleWithTweetinvi === false) {
//       throw new Exception("Tweetinvi proxy credentials can only use System.Net.NetworkCredential");
//     }
//
//     this._networkCredentials = (NetworkCredential)value;
//   }
//
//   get address(): Uri {
//     return this._proxyAddress;
//   }
//
//   public GetProxy(destination: Uri): Uri {
//     return this._proxyAddress;
//   }
//
//   public IsBypassed(host: Uri): boolean {
//     return false;
//   }
// }
