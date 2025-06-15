import { configureStore } from "@reduxjs/toolkit"
import articlesReducer from "./slices/articlesSlice"
import storiesReducer from "./slices/storiesSlice"
import authorsReducer from "./slices/authorsSlice"
import adminReducer from "./slices/adminSlice"

export const store = configureStore({
  reducer: {
    articles: articlesReducer,
    stories: storiesReducer,
    authors: authorsReducer,
    admin: adminReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
