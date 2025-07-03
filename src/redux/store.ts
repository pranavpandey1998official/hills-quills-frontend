import { configureStore } from "@reduxjs/toolkit"
import articlesReducer from "./slices/articlesSlice"
import storiesReducer from "./slices/storiesSlice"
import authorsReducer from "./slices/authorsSlice"
import adminReducer from "./slices/adminSlice"
import publicArticleReducer from "./slices/PublicArticleSlice"

export const store = configureStore({
  reducer: {
    articles: articlesReducer,
    stories: storiesReducer,
    authors: authorsReducer,
    admin: adminReducer,
    publicArticles: publicArticleReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
