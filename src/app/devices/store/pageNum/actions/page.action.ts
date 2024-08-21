import { createAction, props } from "@ngrx/store";


export const setPagination = createAction(
    '[Pagination] Set Pagination',
    props<{ pagination: any }>()
  );