import history from '../history';
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { filterByTags } from './posts';
import api from "../api";

export const showSubCategory = createAsyncThunk("showSubCategory", async (payload) => {
  const subcategories = await api.get(`categories/${payload}/subcategories`);
  return subcategories.data.map(subcategory => ({
    id: subcategory.id,
    title: subcategory.name,
    key: subcategory.key,
    isActive: false,
  }));

  /*return Array.from(new Array(10).keys()).map(k => {
    return {
      id: k,
      title: `Subcategory ${k}`,
      key: `subcategory${k}`,
      isActive: false,// Math.random()*100 > 35,
    };
  });*/
});

export const toggleSubCategoryActive = createAsyncThunk("toggleSubCategoryActive", async (key, { dispatch, getState }) => {
  const { subcategories } = getState();
  const updatedList = subcategories.subcategories.map((subcategory) => {
    if (subcategory.key === key) {
      return {
        ...subcategory,
        isActive: !subcategory.isActive,
      };
    }
    return subcategory;
  });

  const activeList = updatedList.filter(subcategory => subcategory.isActive).map(subcategory => subcategory.key);

  dispatch(filterByTags(activeList));
  return updatedList;
});

const subCategoriesSlice = createSlice({
  name: "subcategories",
  initialState: {
    subcategories: [],
    title: "",
    isVisible: false,
    isLoading: false,
    isError: false,
    error: null,
  },
  reducers: {
    hideSubCategory: (state) => {
      return {
        ...state,
        subcategories: [],
        isVisible: false,
      };
    },
    toggleSubCategoryActive: (state, { payload }) => {
      return {
        ...state,
        subcategories: state.subcategories.map(subcategory => {
          if (subcategory.id === payload) {
            return {
              ...subcategory,
              isActive: !subcategory.isActive,
            };
          }
          return subcategory;
        }),
      };
    },
  },
  extraReducers: (builder) => {
    builder.addCase(showSubCategory.fulfilled, (state, action) => {
      const title = history.location?.hash
        .slice(1)
        .replace(/(^\w|\s\w)/g, (m) => m.toUpperCase());
      return {
        ...state,
        subcategories: action.payload,
        isVisible: true,
        title: title,
      };
    });
    builder.addCase(toggleSubCategoryActive.fulfilled, (state, action) => {
      return {
        ...state,
        subcategories: action.payload,
      };
    });
  },
});

export const { hideSubCategory } = subCategoriesSlice.actions;

export default subCategoriesSlice.reducer;
