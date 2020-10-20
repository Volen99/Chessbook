// Information used to generate an OAuth query
export interface IOAuthQueryParameter {
  // Parameter name
  key: string;

  // Parameter value
  value: string;

  // Is this parameter required to generate the signature
  requiredForSignature: boolean;

  // Is this parameter required to generate the headers
  requiredForHeader: boolean;

  // Is this parameter required to generate the secret key
  isPartOfOAuthSecretKey: boolean;
}
