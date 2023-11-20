import { createReducer, on } from '@ngrx/store';
import * as apiActions from './actions';

export const initialState: any = {
  data: null,
};

export interface AppState {
  loading: boolean;
}

export const selectLoading = (state: AppState) => state.loading;

export const apiReducer = createReducer(
  initialState,
  on(apiActions.loadAPISuccess, (state, { data }) => ({ ...state, data })),
  on(apiActions.postItem, (state, { item }) => {
    return { ...state, newItem: item };
  }),
  on(apiActions.putItem, (state, { id, item }) => {
    return { ...state, updatedItem: { id, ...item } };
  })
);