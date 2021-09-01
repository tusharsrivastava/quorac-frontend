import { configureStore } from "@reduxjs/toolkit";
import categoriesReducer from "./features/categories";
import subcategoriesReducer from "./features/subcategories";
import postsReducer from "./features/posts";
import singlePostReducer from "./features/singlepost";
import newPostReducer from "./features/newpost";
import userProfileReducer from "./features/profile";

export const store = configureStore({
  reducer: {
    categories: categoriesReducer,
    subcategories: subcategoriesReducer,
    posts: postsReducer,
    singlePost: singlePostReducer,
    newPost: newPostReducer,
    userProfile: userProfileReducer,
  }
});
