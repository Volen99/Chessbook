﻿import Type from "../../../c#-objects/TypeScript.NET-Core/packages/Core/source/Types";

export static class ResourcesHelper {
  public static getResourceByName(source: object, resourceName: string): string {
    let type = source.GetType();

    return ResourcesHelper.getResourceByType(type, resourceName, source);
  }

        public static getResourceByType(type: Type, resourceName: string, source: object = null): string
        {
            let fields = type.GetFields().ToDictionary(x => x.Name);

            if (fields.TryGetValue(resourceName, out var fieldInfo))
            {
                var value = fieldInfo.GetValue(source);
                return value as string;
            }

            var properties = type.GetProperties().ToDictionary(x => x.Name);

            if (properties.TryGetValue(resourceName, out var propertyInfo))
            {
                var value = propertyInfo.GetValue(source, new object[0]);
                return value as string;
            }

            return null;
        }
    }