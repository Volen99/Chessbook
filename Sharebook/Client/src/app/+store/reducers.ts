import {createReducer, on} from "@ngrx/store";
import {authenticate, login, logout, register} from "./actions";
import {IUser} from "../api-authorization/authorize.service";

export interface IAuthState {
  currentUser: IUser | null | undefined;
}

export const initialState: IAuthState = {
  currentUser: undefined,
};

export const authReducer = createReducer<IAuthState>(
  initialState,
  on(login, (state, action) => {
    return {...state, currentUser: action.user};
  }),
  on(register, (state, action) => {
    return {...state, currentUser: action.user};
  }),
  on(authenticate, (state, action) => {
    return {...state, currentUser: action.user};
  }),
  on(logout, (state) => {
    return {...state, currentUser: null};
  })
);
