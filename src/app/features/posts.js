import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../api";
// import history from "../history";

const contentTypeToPostType = (contentType) => {
  switch (contentType) {
    case "Unanswered":
      return "question";
    case "Answer":
      return "answer";
    case "Article":
      return "article";
    case "Blog Post":
      return "blog";
    default:
      return "";
  }
}

const contentTypeFromPostType = (postType) => {
  switch (postType) {
    case "question":
      return "Unanswered";
    case "answer":
      return "Answer";
    case "article":
      return "Article";
    case "blog":
      return "Blog Post";
    default:
      return "";
  }
}

export const fetchPosts = createAsyncThunk("fetchPosts", async (payload) => {
  const { type, contentType } = payload || {};
  // If no type is specified, fetch trending posts
  let response = [];
  if (!type) {
    response = await api.get("/posts/trending");
  } else {
    const ptype = contentTypeToPostType(contentType);
    response = await api.get(`/posts/type/${ptype}`);
  }
  console.log(response);
  return response.data.data.map((post) => ({
    id: post.id,
    contentType: contentTypeFromPostType(post.type),
    type: "post",
    title: post.title,
    content: post.content,
    statistics: {
      upvotes: post.upvotes,
      downvotes: post.downvotes,
      comments: post.numComments,
      views: post.numLikes,
    },
    postedBy: {
      id: post.createdBy.id,
      username: post.createdBy.username,
      firstName: post.createdBy.firstName,
      lastName: post.createdBy.lastName,
      on: post.createdAt,
    },
    questioner: post.parent
      ? {
          id: post.parent?.createdBy.id,
          username: post.createdBy.username,
          firstName: post.parent?.createdBy.firstName,
          lastName: post.parent?.createdBy.lastName,
          on: post.parent?.createdAt,
        }
      : null,
    category: post.category,
    tags: post.tags,
  }));
});

const postsSlice = createSlice({
  name: "posts",
  initialState: {
    posts: [],
    filteredPosts: [],
    originalPosts: [],
    isLoading: false,
    isError: false,
    error: null,
  },
  reducers: {
    filterByCategory: (state, { payload }) => {
      console.log('Category', payload);
      state.filteredPosts = state.originalPosts.filter(
        (post) => post.category === payload
      );
      state.posts = state.originalPosts.filter(
        (post) => post.category === payload
      );
    },
    filterByTags: (state, { payload }) => {
      console.log('Tags', payload);
      if (payload.length > 0) {
        state.posts = state.filteredPosts.filter(
          (post) => payload.some((tag) => post.tags.includes(tag))
        );
      } else {
        state.posts = state.filteredPosts;
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchPosts.fulfilled, (state, action) => {
      return {
        ...state,
        posts: action.payload,
        originalPosts: action.payload,
        isLoading: false,
        isError: false,
        error: null,
      };
    });
  },
});

export const { filterByCategory, filterByTags } = postsSlice.actions;

export default postsSlice.reducer;
