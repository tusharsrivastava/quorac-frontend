import { withTheme } from "styled-components";
import { Layout } from "../components/Layout";
import { ArticleCard } from "../components/ArticleCard";
import { PollCard } from "../components/PollCard";
import { LeftSidebar, RightSidebar } from "../components/Sidebar";

import siteRoutes from "../Routes";

const Home = (props) => {
  return (
    <Layout
      pageTitle="Trending"
      routes={siteRoutes}
      leftSidebar={<LeftSidebar routes={siteRoutes} />}
      rightSidebar={<RightSidebar />}
    >
      {Array.from(Array(10).keys()).map((i) => (Math.round(100*Math.random()) < 20) ? <PollCard key={i} isLive={(Math.round(100*Math.random()) < 65)} /> : <ArticleCard key={i} contentType="Question" />)}
    </Layout>
  );
}

export default withTheme(Home);
