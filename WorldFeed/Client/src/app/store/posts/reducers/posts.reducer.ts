import {Post} from '../../../history/BC/science/interfaces/post';
import * as PostsActions from '../actions/posts.actions';
import {PostsState} from '../state/posts.state';

const initialState: PostsState = {
  all: [],
  create: null,
};

export function postsReducer(state: PostsState, action: PostsActions.Types) {
  switch (action.type) {
    case PostsActions.ADD_POST:
      return addPost(state.all, action.payload);

    case PostsActions.REMOVE_POST:
      return removePost(state.all, action.payload);

    case PostsActions.GET_ALL_POSTS:
      return getAllPosts(state, action.payload);

    default:
      return state;
  }
}

function addPost(state: Post[], post) {
  return [...state, post];
}

function removePost(state: Post[], id) {
  const postToBeRemoved = state[id];
  return [...state.filter(p => p !== postToBeRemoved)];
}

function getAllPosts(state, allPosts) {
  // {} - заздай ми нов обект
  // state - копирай всичко в новия обект
  // и сложи и all вътре
  //
  return Object.assign({}, state, {
    all: allPosts,
  });
}
