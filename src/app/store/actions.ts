import { createAction, props } from '@ngrx/store';

export const loadAPIData = createAction('[API] Load Data');
export const loadAPISuccess = createAction('[API] Load Data Success', props<{ data: any }>());

// export const postItem = createAction('[Item] Post Item', props<{ item: any }>());
// export const putItem = createAction('[Item] Put Item', props<{ id: number, item: any }>());

export const postItem = createAction('[API] Post Item', props<{ item: any }>());
export const postItemSuccess = createAction('[API] Post Item Success', props<{ item: any }>());
export const postItemFailure = createAction('[API] Post Item Failure', props<{ error: any }>());

export const putItem = createAction('[API] Put Item', props<{ id: number, item: any }>());
export const putItemSuccess = createAction('[API] Put Item Success', props<{ id: number, item: any }>());
export const putItemFailure = createAction('[API] Post Item Failure', props<{ id: number, error: any }>());

export const setLoading = createAction('[UI] Set Loading', props<{ loading: boolean }>());