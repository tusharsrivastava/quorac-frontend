import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import history from "../history";
import { fetchPosts, filterByCategory } from "./posts";
import { get, post } from '../api';

import { showSubCategory, hideSubCategory } from "./subcategories";

export const fetchCategories = createAsyncThunk("fetchCategories", async () => {
  const categories = await get('/categories');
  return categories.data.map(category => ({
      id: category.id,
      title: category.name,
      key: category.key,
      active: false,
      actions: [
        {
          title: category.isFollowed ? `-Unfollow (${category.followers})` : `+Follow (${category.followers})`,
          theme: category.isFollowed ? "danger" : "primary",
          type: category.isFollowed ? "unfollow" : "follow",
        }
      ]
  }));
});

export const setActiveCategory = createAsyncThunk("setActiveCategory", async(payload, { dispatch, getState }) => {
  const { categories } = getState();
  const prevSelected = categories.categories.find(c => c.active);
  const cats = categories.categories.map(c => {
    return {
      ...c,
      active: false,
    };
  });
  if (prevSelected !== undefined && prevSelected.key === payload) {
    history.push({ ...history.location, hash: '' });
    dispatch(hideSubCategory());
    dispatch(fetchPosts());
  } else {
    cats.forEach(c => {
      if (c.key === payload) {
        c.active = true;
      }
    });
    const currentSelected = cats.find((c) => c.active);
    history.push({ ...history.location, hash: '#' + payload });
    dispatch(showSubCategory(currentSelected.id));
    dispatch(filterByCategory(payload));
  }
  return cats;
});

export const toggleFollowCategory = createAsyncThunk("toggleFollowCategory", async(payload) => {
  const response = await post('/categories/' + payload + '/follow/toggle');
  return response.data;
});

const categoriesSlice = createSlice({
  name: "categories",
  initialState: {
    categories: [],
    isLoading: true,
    isError: false,
    error: null,
    selectedCategory: null,
  },
  extraReducers: (builder) => {
    builder.addCase(fetchCategories.fulfilled, (state, action) => {
      return {
        ...state,
        categories: action.payload,
        isLoading: false,
        isError: false,
        error: null,
      };
    });
    builder.addCase(setActiveCategory.fulfilled, (state, action) => {
      return {
        ...state,
        categories: action.payload,
        isLoading: false,
        isError: false,
        error: null,
      };
    });
    builder.addCase(fetchCategories.rejected, (state, action) => {
      return {
        ...state,
        isLoading: false,
        isError: true,
        error: action.payload,
      };
    });
    builder.addCase(setActiveCategory.rejected, (state, action) => {
      return {
        ...state,
        isLoading: false,
        isError: true,
        error: action.payload,
      };
    });
    builder.addCase(toggleFollowCategory.fulfilled, (state, action) => {
      return {
        ...state,
        categories: state.categories.map(cat => {
          if (cat.id === action.payload.id) {
            return {
              ...cat,
              followers: action.payload.followers,
              actions: cat.actions.map(a => ({
                ...a,
                type: action.payload.isFollowed ? "unfollow" : "follow",
                theme: action.payload.isFollowed ? "danger" : "primary",
                title: action.payload.isFollowed ? `-Unfollow (${action.payload.followers})` : `+Follow (${action.payload.followers})`,
              })),
            };
          }
        return cat;
        }),
        isLoading: false,
        isError: false,
        error: null,
      };
    });
  },
});

export default categoriesSlice.reducer;
