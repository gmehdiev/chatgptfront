import { combineReducers, configureStore } from "@reduxjs/toolkit";
import {reducer as userReducer} from './slices/user.Slice'
import { useDispatch } from "react-redux";
const reducers = combineReducers({
  user: userReducer,
})

export const store = configureStore({
    reducer: reducers,
  })

  // Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch

export const useThunkDispatch = () => useDispatch<AppDispatch>();
