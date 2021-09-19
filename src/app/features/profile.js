import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { get, post } from "../api";

export const fetchUserProfile = createAsyncThunk("fetchUserProfile", async (payload) => {
  if (!payload) {
    const response = await get(`/users`);
    return response.data;
  } else {
    const response = await get(`/users/${payload}`);
    return response.data;
  }
});

export const updateProfile = createAsyncThunk("updateProfile", async (payload) => {
  const response = await post('/users/profile', payload);
  return response.data;
});

export const toggleFollow = createAsyncThunk(
  "toggleFollow",
  async (payload) => {
    const response = await post("/users/" + payload + "/follow/toggle");
    return response.data;
  }
);

export const fetchCompanies = async (payload) => {
  const { term, limit } = payload;
  const response = await get(`/users/companies?term=${term}&limit=${limit}`);
  return response.data.map((e) => ({
    value: e.id,
    label: e.name,
  }));
};

export const fetchSchools = async (payload) => {
  const { term, limit } = payload;
  const response = await get(`/users/schools?term=${term}&limit=${limit}`);
  return response.data.map((e) => ({
    value: e.id,
    label: e.name,
  }));
};

export const fetchLanguages = async (payload) => {
  const { term, limit } = payload;
  const response = await get(`/users/languages?term=${term}&limit=${limit}`);
  return response.data.map((e) => ({
    value: e.id,
    label: e.name,
  }));
};

export const fetchHobbies = async (payload) => {
  const { term, limit } = payload;
  const response = await get(`/users/hobbies?term=${term}&limit=${limit}`);
  return response.data.map((e) => ({
    value: e.id,
    label: e.name,
  }));
};

export const loadCompanies = createAsyncThunk("loadCompanies", fetchCompanies);

export const loadSchools = createAsyncThunk("loadSchools", fetchSchools);

export const loadLanguages = createAsyncThunk("loadLanguages", fetchLanguages);

export const loadHobbies = createAsyncThunk("loadHobbies", fetchHobbies);

const userProfile = createSlice({
  name: "userProfile",
  initialState: {
    user: null,
    companies: [],
    schools: [],
    languages: [],
    hobbies: [],
    isLoading: false,
    error: null,
  },
  extraReducers: {
    [fetchUserProfile.pending]: (state, action) => {
      state.isLoading = true;
    },
    [fetchUserProfile.fulfilled]: (state, action) => {
      state.user = action.payload;
      state.isLoading = false;
    },
    [fetchUserProfile.rejected]: (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    },
    [updateProfile.pending]: (state, action) => {
      state.isLoading = true;
    },
    [updateProfile.fulfilled]: (state, action) => {
      state.user = action.payload;
      state.isLoading = false;
    },
    [updateProfile.rejected]: (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    },
    [loadCompanies.fulfilled]: (state, action) => {
      state.companies = action.payload;
    },
    [loadCompanies.rejected]: (state, action) => {
      state.companies = [];
    },
    [loadSchools.fulfilled]: (state, action) => {
      state.schools = action.payload;
    },
    [loadSchools.rejected]: (state, action) => {
      state.schools = [];
    },
    [loadLanguages.fulfilled]: (state, action) => {
      state.languages = action.payload;
    },
    [loadLanguages.rejected]: (state, action) => {
      state.languages = [];
    },
    [loadHobbies.fulfilled]: (state, action) => {
      state.hobbies = action.payload;
    },
    [loadHobbies.rejected]: (state, action) => {
      state.hobbies = [];
    },
    [toggleFollow.pending]: (state, action) => {
      state.isLoading = true;
    },
    [toggleFollow.fulfilled]: (state, action) => {
      state.user = action.payload;
      state.isLoading = false;
    },
    [toggleFollow.rejected]: (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    }
  },
});

export default userProfile.reducer;
