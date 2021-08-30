import { configureStore } from "@reduxjs/toolkit";
import categoriesReducer from "./features/categories";
import subcategoriesReducer from "./features/subcategories";
import postsReducer from "./features/posts";
import singlePostReducer from "./features/singlepost";

export const store = configureStore({
  reducer: {
    categories: categoriesReducer,
    subcategories: subcategoriesReducer,
    posts: postsReducer,
    singlePost: singlePostReducer,
  }
});
