import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EMPTY, of } from 'rxjs';
import { catchError, map, mergeMap, switchMap } from 'rxjs/operators';
import { ApiService } from '../api.service'; // Create an API service
import * as apiActions from './actions';
import { Store } from '@ngrx/store';
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class ApiEffects {

  loadData$ = createEffect(() => this.actions$.pipe(
    ofType(apiActions.loadAPIData),
    mergeMap(() => this.apiService.getData()
      .pipe(
        map(data => apiActions.loadAPISuccess({ data })),
        catchError(() => EMPTY)
      )
    )
  ));

  
  // postItem$ = createEffect(() =>
  //   this.actions$.pipe(
  //     ofType(apiActions.postItem),
  //     mergeMap(action =>
  //       this.apiService.postItem(action.item).pipe(
  //         map(item => apiActions.postItem({ item }))
  //       )
  //     )
  //   )
  // );

  postItem$ = createEffect(() =>
    this.actions$.pipe(
      ofType(apiActions.postItem),
      mergeMap(action =>
        this.apiService.postItem(action.item).pipe(
          map(item => {
            this.store.dispatch(apiActions.loadAPIData());
            this.toaster.success('New user Added!', 'Success');
            return apiActions.postItemSuccess({ item })
          }) // Assuming you have a success action
        )
      )
    )
  );


  // putItem$ = createEffect(() =>
  //   this.actions$.pipe(
  //     ofType(apiActions.putItem),
  //     mergeMap(action =>
  //       this.apiService.putItem(action.id, action.item).pipe(
  //         map(item => apiActions.putItemSuccess({ id: action.id, item })) // Assuming you have a success action
  //       )
  //     )
  //   )
  // );

  putItem$ = createEffect(() =>
  this.actions$.pipe(
    ofType(apiActions.putItem),
    switchMap(action => {
      const itemId = action.id; // Storing the item ID
      this.store.dispatch(apiActions.setLoading({ loading: true })); // Dispatch loading action when the putItem action starts
      console.log("In process...")
      this.toaster.success('Data Loading...!', 'Please Wait');

      return this.apiService.putItem(action.id, action.item).pipe(
        map(item => {
          this.store.dispatch(apiActions.setLoading({ loading: false })); // Dispatch loading action when the putItem action completes
          this.store.dispatch(apiActions.loadAPIData());
            this.toaster.success('Data Updated!', 'Success');
          return apiActions.putItemSuccess({ id: itemId, item }); // Dispatch success action
        }),
        catchError(error => {
          this.store.dispatch(apiActions.setLoading({ loading: false })); // Dispatch loading action when there's an error
          this.toaster.success('Data update failed...!', 'Success');
          return of(apiActions.putItemFailure({ id: itemId, error })); // Dispatch failure action
        })
      );
    })
  )
);

  

  constructor(private actions$: Actions, private apiService: ApiService, private store: Store<any>, private toaster: ToastrService) {}
}