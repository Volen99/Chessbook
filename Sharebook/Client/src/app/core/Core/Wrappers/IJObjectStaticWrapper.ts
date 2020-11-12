export interface IJObjectStaticWrapper {
  GetJobjectFromJson(json: string): any;

  ToObject<T>(jObject: any): T;

  ToObject<T>(jToken: any): T;

  GetNodeRootName(jToken: any): string;
}
