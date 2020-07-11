import {Action} from '@ngrx/store';
import {PostModel} from '../../../core/history/BC/science/interfaces/post.model.';

export const ADD_POST = '[POST] Add';
export const REMOVE_POST = '[POST] Remove';
export const GET_ALL_POSTS = '[POST] Get All';

export class AddPost implements Action {
  readonly type: string = ADD_POST;

  constructor(payload: PostModel) {
    this.payload = payload;
  }

  public payload: PostModel;
}

export class RemovePost implements Action {
  readonly type: string = REMOVE_POST;

  constructor(payload: number) {
    this.payload = payload;
  }

  public payload: number;
}

export class GetAllPosts implements Action {
  readonly type: string = GET_ALL_POSTS;
  constructor(payload: PostModel[]) {
    this.payload = payload;
  }

  public payload: PostModel[];

}

export type Types = AddPost | RemovePost | GetAllPosts;
