import { withTheme } from "styled-components";
import { Layout } from "../components/Layout";
import { Post } from "../components/Post";
// import { ArticleCard } from "../components/ArticleCard";
// import { PollCard } from "../components/PollCard";
import { LeftSidebar, RightSidebar } from "../components/Sidebar";

import siteRoutes from "../Routes";
import FilterCard from "../components/FilterCard";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchPosts } from "../app/features/posts";

const Home = (props) => {
  const dispatch = useDispatch();
  const { posts } = useSelector(state => state.posts);

  useEffect(() => {
    dispatch(fetchPosts());
  }, [dispatch]);

  return (
    <Layout
      pageTitle="Trending"
      routes={siteRoutes}
      leftSidebar={<LeftSidebar routes={siteRoutes} />}
      rightSidebar={<RightSidebar />}
    >
      <FilterCard />
      {posts.length > 0 &&
        posts.map((post) => <Post post={post} key={post.id} />)}
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

export default withTheme(Home);
