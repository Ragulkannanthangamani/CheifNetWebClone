import {createReducer, on } from "@ngrx/store";
import { setPagination } from "../actions/page.action";


export const pagefeaturekey = 'pageNum';

export const initialState = {
    total_count: 0,
    current_page: 1,
    per_page: 10,
    total_pages: 1,
    next_page: null,
    prev_page: null
  };

  
export const paginationReducer = createReducer(
    initialState,
    on(setPagination, (state, { pagination }) => ({ ...pagination }))
  );