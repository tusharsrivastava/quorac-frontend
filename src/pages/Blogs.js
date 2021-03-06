import { withTheme } from "styled-components";
import { Layout } from "../components/Layout";
import { Post } from "../components/Post";
import { LeftSidebar, RightSidebar } from "../components/Sidebar";

import siteRoutes from "../Routes";

import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { downvotePost, fetchPosts, upvotePost } from "../app/features/posts";
import FilterCard from "../components/FilterCard";

const Blogs = (props) => {
  const dispatch = useDispatch();
  const { posts } = useSelector((state) => state.posts);

  useEffect(() => {
    dispatch(fetchPosts({ contentType: "Blog Post", type: "post" }));
  }, [dispatch]);

  return (
    <Layout
      pageTitle="Blog"
      routes={siteRoutes}
      leftSidebar={<LeftSidebar routes={siteRoutes} />}
      rightSidebar={<RightSidebar />}
    >
      <FilterCard />
      {posts.length > 0 &&
        posts
          .filter((p) => p.type === "post")
          .map((post) => (
            <Post
              key={post.id}
              post={post}
              onUpvote={() => dispatch(upvotePost(post))}
              onDownvote={() => dispatch(downvotePost(post))}
            />
          ))}
      {posts.length === 0 && (
        <div className="text-center">
          <img
            src="/empty.svg"
            alt="No Posts"
            className="img-fluid"
            style={{ maxWidth: "75%" }}
          />
          <h4 className="h4 mt-4">No Posts Available</h4>
        </div>
      )}
    </Layout>
  );
}

export default withTheme(Blogs);
