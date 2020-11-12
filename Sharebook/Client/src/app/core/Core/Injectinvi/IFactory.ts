import {IConstructorNamedParameter} from "./ConstructorNamedParameter";
import {Injectable, InjectionToken, Injector, Type} from "@angular/core";
import {ChunkedUploader} from "../../../controllers/Upload/ChunkedUploader";
import {AppInjector} from "../../../sharebook/Injectinvi/app-injector";
import {TwitterResponse} from "../../../webLogic/TwitterResponse";

export interface IFactory<T> {
  create(typeName: string, ...parameters: IConstructorNamedParameter[]): T;
}

export const IFactoryToken = new InjectionToken<IFactory<any>>('IFactoryToken', {
  providedIn: 'root',
  factory: () => new Factory<any>(),
});

@Injectable({
  providedIn: 'root',
})
export class Factory<T> implements IFactory<T> {
  public create(typeName: string, ...parameters: IConstructorNamedParameter[]): T {
    if (typeName === 'ChunkedUploader') {
      return AppInjector.get<T>(ChunkedUploader as Type<T>);
    } else if (typeName === 'TwitterResponse') {
      return AppInjector.get<T>(TwitterResponse as Type<T>);
    }
  }
}

