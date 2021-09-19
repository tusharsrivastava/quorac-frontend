import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { get, post } from "../api";
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
      return "trending";
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

const getPostsFromResponse = (response) => {
  return response.data.data.map((post) => ({
    id: post.id,
    contentType: contentTypeFromPostType(post.type),
    type: "post",
    title: post.title,
    content: post.content,
    hasUpvoted: post.hasUpvoted,
    hasDownvoted: post.hasDownvoted,
    statistics: {
      upvotes: post.upvotes,
      downvotes: post.downvotes,
      score: post.upvotes - post.downvotes,
      comments: post.numComments,
      views: post.numLikes,
    },
    postedBy: {
      id: post.createdBy.id,
      username: post.createdBy.username,
      level: post.createdBy.level,
      firstName: post.createdBy.firstName,
      lastName: post.createdBy.lastName,
      on: post.createdAt,
    },
    questioner: post.parent
      ? {
          id: post.parent?.createdBy.id,
          username: post.createdBy.username,
          level: post.parent?.createdBy.level,
          firstName: post.parent?.createdBy.firstName,
          lastName: post.parent?.createdBy.lastName,
          on: post.parent?.createdAt,
        }
      : null,
    category: post.category,
    tags: post.tags,
  }));
}

export const fetchPosts = createAsyncThunk("fetchPosts", async (payload, { getState }) => {
  let { type, contentType } = payload || {};
  const { posts } = getState();
  console.log(type, contentType);
  if (type === undefined) {
    type = posts.type;
    contentType = contentTypeFromPostType(type);
    if (contentType === '') {
      type = null;
    }
  }
  // If no type is specified, fetch trending posts
  let response = [];
  if (!type) {
    response = await get("/posts/trending");
  } else {
    const ptype = contentTypeToPostType(contentType);
    response = await get(`/posts/type/${ptype}`);
  }
  console.log(response);
  return {
    type: contentTypeToPostType(contentType),
    posts: getPostsFromResponse(response),
  };
});

export const filterByCategory = createAsyncThunk(
  "filterByCategory",
  async (payload, { getState }) => {
    const { posts} = getState();
    const { type } = posts;
    let response = [];
    if (type === 'trending') {
      response = await get(`/posts/trending?category=${payload}`);
    } else {
      response = await get(`/posts/type/${type}?category=${payload}`);
    }
    return {
      category: payload,
      posts: getPostsFromResponse(response),
    };
  }
);

export const filterByTags = createAsyncThunk("filterByTags", async (payload, { getState }) => {
  const { posts } = getState();
  const { type, category } = posts;
  let response = [];
  if (type === "trending") {
    response = await get(`/posts/trending?category=${category}&subcategories=${payload.join(",")}`);
  } else {
    response = await get(
      `/posts/type/${type}?category=${category}&subcategories=${payload.join(
        ","
      )}`
    );
  }
  return {
    posts: getPostsFromResponse(response),
  };
});

export const upvotePost = createAsyncThunk("upvotePost", async (payload) => {
  const response = {
    id: payload.id,
    downvotes: payload.statistics.downvotes,
    upvotes: payload.statistics.upvotes,
    hasDownvoted: payload.hasDownvoted,
    hasUpvoted: payload.hasUpvoted,
  };

  if (payload.hasDownvoted) {
    // remove downvote first
    const r = await post(`/posts/${payload.id}/downvote`);
    response.downvotes = r.data.count;
    response.hasDownvoted = r.data.action;
  }
  console.log("we're here", payload.id);
  // now upvote it
  const r = await post(`/posts/${payload.id}/upvote`);

  response.upvotes = r.data.count;
  response.hasUpvoted = r.data.action;

  return response;
});

export const downvotePost = createAsyncThunk("downvotePost", async (payload) => {
  const response = {
    id: payload.id,
    downvotes: payload.statistics.downvotes,
    upvotes: payload.statistics.upvotes,
    hasDownvoted: payload.hasDownvoted,
    hasUpvoted: payload.hasUpvoted,
  };

  if (payload.hasUpvoted) {
    // remove upvote first
    const r = await post(`/posts/${payload.id}/upvote`);
    response.upvotes = r.data.count;
    response.hasUpvoted = r.data.action;
  }
  // now downvote it
  const r = await post(`/posts/${payload.id}/downvote`);

  response.downvotes = r.data.count;
  response.hasDownvoted = r.data.action;

  return response;
});

const postsSlice = createSlice({
  name: "posts",
  initialState: {
    type: null,
    category: null,
    posts: [],
    isLoading: false,
    isError: false,
    error: null,
  },
  extraReducers: (builder) => {
    builder.addCase(fetchPosts.fulfilled, (state, action) => {
      return {
        ...state,
        type: action.payload.type,
        posts: action.payload.posts,
        isLoading: false,
        isError: false,
        error: null,
      };
    });
    builder.addCase(filterByCategory.fulfilled, (state, action) => {
      return {
        ...state,
        category: action.payload.category,
        posts: action.payload.posts,
      };
    });
    builder.addCase(filterByTags.fulfilled, (state, action) => {
      return {
        ...state,
        posts: action.payload.posts,
      };
    });
    builder.addCase(upvotePost.fulfilled, (state, action) => {
      return {
        ...state,
        posts: state.posts.map(post => {
          if (post.id === action.payload.id) {
            return {
              ...post,
              hasUpvoted: action.payload.hasUpvoted,
              hasDownvoted: action.payload.hasDownvoted,
              statistics: {
                ...post.statistics,
                upvotes: action.payload.upvotes,
                downvotes: action.payload.downvotes,
                score: action.payload.upvotes - action.payload.downvotes,
              },
            };
          }
          return post;
        }),
      };
    });
    builder.addCase(downvotePost.fulfilled, (state, action) => {
      return {
        ...state,
        posts: state.posts.map((post) => {
          if (post.id === action.payload.id) {
            return {
              ...post,
              hasUpvoted: action.payload.hasUpvoted,
              hasDownvoted: action.payload.hasDownvoted,
              statistics: {
                ...post.statistics,
                upvotes: action.payload.upvotes,
                downvotes: action.payload.downvotes,
                score: action.payload.upvotes - action.payload.downvotes,
              },
            };
          }
          return post;
        }),
      };
    });
  },
});

export default postsSlice.reducer;
