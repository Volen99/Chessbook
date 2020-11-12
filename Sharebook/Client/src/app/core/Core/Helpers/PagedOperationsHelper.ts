import {Injectable, InjectionToken} from "@angular/core";
import Exception from "typescript-dotnet-commonjs/System/Exception";

export interface IPagedOperationsHelper {
  iterateOverWithLimit<TInput, TResult>(input: TInput[], transform: (input: TInput[]) => Promise<TResult[]>, maxItemsPerRequest: number): Promise<TResult[]>;
}

export const IPagedOperationsHelperToken = new InjectionToken<IPagedOperationsHelper>('IPagedOperationsHelper', {
  providedIn: 'root',
  factory: () => new PagedOperationsHelper(),
});

@Injectable({
  providedIn: 'root',
})
export class PagedOperationsHelper implements IPagedOperationsHelper {
  public async getPageResultIterator<TInput, TResult>(input: TInput[], transform: (input: TInput[]) => Promise<TResult[]>, maxItemsPerRequest: number): Promise<TResult[]> {
    let result = new Array<TResult>();

    for (let i = 0; i < input.length; i += maxItemsPerRequest) {
      let pageItemsInput = input.filter((x, y) => y >= i).filter((x, y) => y < maxItemsPerRequest);
      let pageResults = await transform(pageItemsInput); // .ConfigureAwait(false);

      if (pageResults == null) {
        throw new Exception(`Transformation from {typeof(TInput).FullName}[] to {typeof(TResult).FullName}[] returned null in the middle of the iterations.`);
      }

      result.concat(pageResults);
    }

    return result;
  }

  public async iterateOverWithLimit<TInput, TResult>(input: TInput[], transform: (input: TInput[]) => Promise<TResult[]>, maxItemsPerRequest: number): Promise<TResult[]> {
    let result = new Array<TResult>();

    for (let i = 0; i < input.length; i += maxItemsPerRequest) {
      let pageItemsInput = input.filter((x, y) => y >= i).filter((x, y) => y < maxItemsPerRequest);
      let pageResults = await transform(pageItemsInput); // .ConfigureAwait(false);

      if (pageResults == null) {
        throw new Exception(`Transformation from {typeof(TInput).FullName}[] to {typeof(TResult).FullName}[] returned null in the middle of the iterations.`);
      }

      result.concat(pageResults);
    }

    return result;
  }
}
