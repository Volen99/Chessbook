import {ITwitterRequest} from "../../Public/Models/Interfaces/ITwitterRequest";
import {ITwitterResponse} from "./ITwitterResponse";
import {InjectionToken} from "@angular/core";

export interface ITwitterResultFactory {
  create<T = any, TDTO = any, TModel = any>(requestOrResult: ITwitterRequest | ITwitterResult<TDTO>, response: ITwitterResponse | ((tDTO: TDTO) => TModel),
                                            convert?: (tDTO: TDTO) => TModel): ITwitterResult |
                                                                           ITwitterResult<T> |
                                                                           ITwitterResult<TDTO, TModel>;
}

export const ITwitterResultFactoryToken = new InjectionToken<ITwitterResultFactory>('ITwitterResultFactory', {
  providedIn: 'root',
  factory: () => new,
});

export class TwitterResultFactory implements ITwitterResultFactory {
  private readonly _jsonObjectConverter: IJsonObjectConverter;

  constructor(jsonObjectConverter: IJsonObjectConverter) {
    this._jsonObjectConverter = jsonObjectConverter;
  }

  public create<T = any, TDTO = any, TModel = any>(requestOrResult: ITwitterRequest | ITwitterResult<TDTO>, response: ITwitterResponse | ((tDTO: TDTO) => TModel),
                                                   convert?: (tDTO: TDTO) => TModel): ITwitterResult | ITwitterResult<T> | ITwitterResult<TDTO, TModel> {
    let isITwitterResult = (reqOrRes: ITwitterRequest | ITwitterResult<TDTO>): reqOrRes is ITwitterResult<TDTO> => (requestOrResult as ITwitterResult<TDTO>).content !== undefined;
    if (isITwitterResult(requestOrResult)) {
      return this.create(requestOrResult.request, requestOrResult.response, convert); // TODO: Beware!! RECURSION!!
    }

    let twitterResult;
    if (convert) {
      twitterResult = new TwitterResult<TDTO, TModel>(this._jsonObjectConverter, convert);
    } else {
      twitterResult = new TwitterResult<T>(this._jsonObjectConverter);
    }

    // @ts-ignore
    if (!T) {         // TODO: BUUUUUUUUUUG!!! 🐛🐜🐛🐜
      twitterResult = new TwitterResult();
    } else {
      twitterResult = new TwitterResult<T>(this._jsonObjectConverter);
    }

    twitterResult.Response = response;
    twitterResult.Request = requestOrResult;

    return twitterResult;
  }
}

export interface ITwitterResult<TModel = any, TDTO = any> {
  response: ITwitterResponse;
  request: ITwitterRequest;
  content: string;

  model?: TModel;
  result?: TModel;
}

export class TwitterResult<TDTO = any, TModel = any> implements ITwitterResult {
  private readonly IJsonObjectConverter;
  _jsonObjectConverter;

  private readonly _convert: (tDTO: TDTO) => TModel;
  private _result: TModel | TDTO;

  private _initialized?: boolean;

  constructor(jsonObjectConverter?: IJsonObjectConverter, convert?: (tDTO: TDTO) => TModel) {
    if (jsonObjectConverter && !convert) {
      this._jsonObjectConverter = jsonObjectConverter;
    } else if (convert) {
      this._jsonObjectConverter = jsonObjectConverter;
      this._convert = convert;
    }

  }

  public response: ITwitterResponse;
  public request: ITwitterRequest;

  get content(): string {
    return this.response?.content;
  }

  get model(): TDTO {
    if (!this._initialized) {
      this._initialized = true;
      let json = this.response?.content;
      let converters = this.request.executionContext.converters;
      this._result = this._jsonObjectConverter.Deserialize<TDTO>(json, converters);
    }

    return this._result as TDTO;
  }

  set model(value: TDTO) {
    this._initialized = true;
    this._result = value;
  }

  get result(): TModel {
    let dto = this.model;

    if (dto == null) {
      return undefined;
    }

    if (this._result == null) {
      this._result = this._convert(dto);
    }

    return this._result as TModel;
  }
}
