import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import history from "../history";
import { fetchPosts, filterByCategory } from "./posts";
import api from '../api';

import { showSubCategory, hideSubCategory } from "./subcategories";

export const fetchCategories = createAsyncThunk("fetchCategories", async () => {
  const categories = await api.get('/categories');
  return categories.data.map(category => ({

      id: category.id,
      title: category.name,
      key: category.key,
      active: false,
      actions: [
        {
          title: `+Follow (${category.followers})`,
          theme: "primary",
          type: "follow"
        }
      ]
  }));
  /*
  return [
    {
      title: "Arts and Humanities",
      key: "art",
      active: false,
      actions: [
        {
          title: "+Follow (6.4k)",
          theme: "primary",
          type: "follow",
        },
      ],
    },
    {
      title: "Beauty and Style",
      key: "beauty",
      active: false,
      actions: [
        {
          title: "+Follow (1.3m)",
          theme: "primary",
          type: "follow",
        },
      ],
    },
    {
      title: "Business and Finance",
      key: "business",
      active: false,
      actions: [
        {
          title: "-Unfollow (3.4k)",
          theme: "danger",
          type: "unfollow",
        },
      ],
    },
    {
      title: "Cars and Transportation",
      key: "transport",
      active: false,
      actions: [
        {
          title: "+Follow (1.2k)",
          theme: "primary",
          type: "follow",
        },
      ],
    },
    {
      title: "Computers and Internet",
      key: "internet",
      active: false,
      actions: [
        {
          title: "-Unfollow (17.2k)",
          theme: "danger",
          type: "unfollow",
        },
      ],
    },
    {
      title: "Consumer Electronics",
      key: "electronics",
      active: false,
      actions: [
        {
          title: "+Follow (1.3k)",
          theme: "primary",
          type: "follow",
        },
      ],
    },
  ];
  */
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

const categoriesSlice = createSlice({
  name: "categories",
  initialState: {
    categories: [],
    isLoading: true,
    isError: false,
    error: null,
    selectedCategory: null,
  },
  reducers: {
    toggleFollowCategory: (state, { payload }) => {
      console.log(payload);
      const cat = state.categories.find(cat => cat.key === payload);
      if (cat !== undefined) {
        cat.actions.forEach(a => {
          if (a.type === "follow") {
            a.type = "unfollow";
            a.theme = "danger";
            a.title = a.title.replace("+Follow", "-Unfollow");
          } else {
            a.type = "follow";
            a.theme = "primary";
            a.title = a.title.replace("-Unfollow", "+Follow");
          }
        });
      }
    },
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
  },
});

export const { toggleFollowCategory } = categoriesSlice.actions;

export default categoriesSlice.reducer;
