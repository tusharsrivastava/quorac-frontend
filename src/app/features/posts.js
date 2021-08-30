import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../api";
// import history from "../history";

const randomCategory = () => {
  const categories = ["art", "beauty", "business", "transport", "internet", "electronics"];
  return categories[Math.floor(Math.random() * categories.length)];
}

const randomSubcategories = () => {
  // Select 3 to 5 tags from a list of subcategories
  const subcategories = Array.from((new Array(10)).keys()).map(i => `subcategory${i}`);
  const subcategoriesList = [];
  for (let i = 0; i < Math.floor(Math.random() * 5) + 3; i++) {
    subcategoriesList.push(subcategories[Math.floor(Math.random() * subcategories.length)]);
  }
  return subcategoriesList;
}

const randomContentType = () => {
  const contentTypes = ["Question", "Article", "Blog Post"];
  return contentTypes[Math.floor(Math.random() * contentTypes.length)];
}

const contentTypeToPostType = (contentType) => {
  switch (contentType) {
    case "Question":
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
    case "answer":
      return "Question";
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
      firstName: post.createdBy.firstName,
      lastName: post.createdBy.lastName,
      on: post.createdAt,
    },
    questioner: post.parent ? {
      id: post.parent?.createdBy.id,
      firstName: post.parent?.createdBy.firstName,
      lastName: post.parent?.createdBy.lastName,
      on: post.parent?.createdAt,
    } : null,
    category: post.category,
    tags: post.tags,
  }));
  /*
  return Array.from(Array(10).keys()).map((i) => {
    return {
      id: i,
      contentType: contentType ? contentType : randomContentType(),
      type: type ? type : Math.round(100 * Math.random()) < 20 ? "poll" : "post",
      title: "How to use Redux?",
      content: "This is a question about how to use redux",
      statistics: {
        views: Math.ceil(9999 * Math.random()),
        upvotes: Math.ceil(10 * Math.random()),
        downvotes: Math.ceil(5 * Math.random()),
        comments: Math.ceil(3 * Math.random()),
      },
      category: randomCategory(),
      tags: randomSubcategories(),
    };
  });*/
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
