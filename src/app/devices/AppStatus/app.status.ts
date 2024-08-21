import { ActionReducerMap } from "@ngrx/store";
import { paginationReducer } from "../store/pageNum/reducers/page.reducers";



export interface AppState {
    pagination: any;
  }
  
  export const reducers: ActionReducerMap<AppState> = {
    pagination: paginationReducer
  };
  