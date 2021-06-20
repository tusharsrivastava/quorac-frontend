import { withTheme } from "styled-components";
import { Layout } from "../components/Layout";
import { ArticleCard } from "../components/ArticleCard";
import { LeftSidebar, RightSidebar } from "../components/Sidebar";

import siteRoutes from "../Routes";

const Blogs = (props) => {
  return (
    <Layout
      pageTitle="Blog"
      routes={siteRoutes}
      leftSidebar={<LeftSidebar routes={siteRoutes} />}
      rightSidebar={<RightSidebar />}
    >
      {Array.from(Array(10).keys()).map((i) => <ArticleCard key={i} contentType="Blog Post" />)}
    </Layout>
  );
}

export default withTheme(Blogs);
