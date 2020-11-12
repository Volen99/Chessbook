export interface IJsonPropertyConverterRepository {
  getObjectConverter(objectToConvert: object): any;

  getTypeConverter(objectType: any): any;

  canConvert(objectType: any): boolean;

  readJson(reader: any, objectType: any, existingValue: object, serializer: any): object;

  writeJson(writer: any, value: object, serializer: any): void;
}
