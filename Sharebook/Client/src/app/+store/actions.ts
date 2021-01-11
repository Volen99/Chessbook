import {createAction, props} from "@ngrx/store";
import {IUser} from "../api-authorization/authorize.service";

export const login = createAction('[Auth] LOGIN', props<{user: IUser}>());
export const register = createAction('[AUTH] REGISTER', props<{user: IUser}>());
export const logout = createAction('[AUTH] LOGOUT');
export const authenticate = createAction('[AUTH] AUTHENTICATE', props<{user: IUser}>());
