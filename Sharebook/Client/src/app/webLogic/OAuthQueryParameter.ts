import {IOAuthQueryParameter} from "../core/Core/Web/IOAuthQueryParameter";

// Information used to generate an OAuth query
export class OAuthQueryParameter implements IOAuthQueryParameter {

  //#region Constructor

  /// <summary>
  /// Creates an OAuthQuery parameter that will be required to create
  /// an OAuth HttpWebRequest
  /// </summary>
  /// <param name="key">Parameter name</param>
  /// <param name="value">Parameter value</param>
  /// <param name="requiredForSignature">Is this parameter required to generate the signature</param>
  /// <param name="requiredForHeader">Is this parameter required to generate the secret key</param>
  /// <param name="isPartOfOAuthSecretKey">Is this parameter required to generate the secret key</param>
  constructor(key: string, value: string, requiredForSignature: boolean,
              requiredForHeader: boolean, isPartOfOAuthSecretKey: boolean) {
    this.key = key;
    this.value = value;
    this.requiredForSignature = requiredForSignature;
    this.requiredForHeader = requiredForHeader;
    this.isPartOfOAuthSecretKey = isPartOfOAuthSecretKey;
  }

  // #region Public Properties

  public key: string;
  public value: string;
  public requiredForSignature: boolean;
  public requiredForHeader: boolean;
  public isPartOfOAuthSecretKey: boolean;

  // #endregion
}
