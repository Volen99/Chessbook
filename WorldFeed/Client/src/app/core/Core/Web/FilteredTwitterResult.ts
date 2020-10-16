import {ITwitterResult, TwitterResult} from "./TwitterResult";

// export interface IFilteredTwitterResult<TDTO> extends ITwitterResult<TDTO> {
//   FilteredDTO: TDTO;
// }

export interface IFilteredTwitterResult<TDTO, TFilterResultDTO = any> extends ITwitterResult<TDTO> {
  FilteredDTO?: TDTO;
  FilteredResultsDTO?: TFilterResultDTO;
}

export class FilteredTwitterResult<TDTO, TFilteredResultDTO = any> extends TwitterResult<TDTO> implements IFilteredTwitterResult<TDTO, TFilteredResultDTO> {
  constructor(source: ITwitterResult<TDTO>, filteredResultsResultDTO?: TFilteredResultDTO) {
    super();

    super.request = source.request;
    super.response = source.response;
    super.model = source.model;
    if (filteredResultsResultDTO) {
      this.FilteredResultsDTO = filteredResultsResultDTO;
    } else {
      this.FilteredDTO = source.model;
    }
  }

  public FilteredDTO?: TDTO;
  public FilteredResultsDTO?: TFilteredResultDTO;
}
