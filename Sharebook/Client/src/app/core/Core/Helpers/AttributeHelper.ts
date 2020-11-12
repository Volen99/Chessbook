import {Injectable, InjectionToken} from "@angular/core";

import Dictionary from "typescript-dotnet-commonjs/System/Collections/Dictionaries/Dictionary";

export interface IAttributeHelper {
  getAttributes<T1>(method: any): Array<T1>;

  getAttributes<T1>(property: any): Array<T1>;

  getAllPropertiesAttributes<T1, T2>(): Dictionary<T2, any>;

  getPropertyAttributes<T1, T2, T3>(propertyExpression: any): Array<T1>;
}

export const IAttributeHelperToken = new InjectionToken<IAttributeHelper>('IAttributeHelper', {
  providedIn: 'root',
  factory: () => new AttributeHelper(),
});

@Injectable({
  providedIn: 'root',
})
export class AttributeHelper implements IAttributeHelper {
  getAllPropertiesAttributes<T1, T2>(): Dictionary<T2, any> {
    return undefined;
  }

  getAttributes<T1>(method: any): Array<T1> {
    return undefined;
  }

  getPropertyAttributes<T1, T2, T3>(propertyExpression: any): Array<T1> {
    return undefined;
  }

}

    // public class AttributeHelper : IAttributeHelper
    // {
    //     public Dictionary<T2, PropertyInfo> GetAllPropertiesAttributes<T1, T2>() where T2 : Attribute
    //     {
    //         var propertiesAttributes = new Dictionary<T2, PropertyInfo>();
    //         var properties = typeof(T1).GetProperties();
    //
    //         foreach (var property in properties)
    //         {
    //             var customAttributes = property.GetCustomAttributes(typeof(T2), false).OfType<T2>();
    //             var customAttribute = customAttributes.JustOneOrDefault();
    //
    //             if (customAttribute != null)
    //             {
    //                 propertiesAttributes.Add(customAttribute, property);
    //             }
    //         }
    //
    //         return propertiesAttributes;
    //     }
    //
    //     public IEnumerable<T1> GetAttributes<T1>(MethodInfo method)
    //     {
    //         return  method.GetCustomAttributes(typeof (T1), false).OfType<T1>();
    //     }
    //
    //     public IEnumerable<T1> GetAttributes<T1>(MemberInfo property)
    //     {
    //         return property.GetCustomAttributes(typeof(T1), false).OfType<T1>();
    //     }
    //
    //     public IEnumerable<T1> GetPropertyAttributes<T1, T2, T3>(Expression<Func<T3>> propertyExpression) where T1 : Attribute
    //     {
    //         var body = propertyExpression?.Body as MemberExpression;
    //
    //         if (body?.Member == null)
    //         {
    //             return null;
    //         }
    //
    //         var memberName = body.Member.Name;
    //         var properties = typeof (T2).GetProperties();
    //         var property = properties.FirstOrDefault(x => x.Name == memberName);
    //
    //         if (property == null)
    //         {
    //             return null;
    //         }
    //
    //         var customAttributes = property.GetCustomAttributes(typeof (T1), false).OfType<T1>();
    //         return customAttributes;
    //     }
    // }
