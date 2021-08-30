import { withTheme } from "styled-components";
import siteRoutes from "../Routes";
import { Layout } from '../components/Layout';
import { LeftSidebar, RightSidebar } from "../components/Sidebar";
import { Post } from "../components/Post";

import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchPosts } from "../app/features/posts";
import FilterCard from "../components/FilterCard";

const Polls = (props) => {
  const dispatch = useDispatch();
  const { posts } = useSelector((state) => state.posts);

  useEffect(() => {
    dispatch(fetchPosts({ contentType: "Poll", type: "poll" }));
  }, [dispatch]);

  return (
    <>
      <Layout
        pageTitle="Polls"
        routes={siteRoutes}
        leftSidebar={<LeftSidebar routes={siteRoutes} />}
        rightSidebar={<RightSidebar />}
      >
        <FilterCard />
        {posts.length > 0 &&
          posts
            .filter((p) => p.type === "poll")
            .map((post) => <Post key={post.id} post={post} />)}
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
    </>
  );
};

export default withTheme(Polls);
