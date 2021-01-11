import {authReducer, IAuthState} from "./reducers";
import {ActionReducerMap} from "@ngrx/store";

export interface IRootState {
  readonly auth: IAuthState;
}

export const reducers: ActionReducerMap<IRootState> = {
  auth: authReducer,
};
