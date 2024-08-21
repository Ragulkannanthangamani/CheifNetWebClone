import { createFeatureSelector, createSelector } from "@ngrx/store";


export const selectPaginationState = createFeatureSelector<any>('pagination');

export const selectPagination = createSelector(
  selectPaginationState,
  (state) => {
  console.log(state,'from state');
  return state;
})