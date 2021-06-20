import { withTheme } from "styled-components";
import { Layout } from "../components/Layout";
import { ArticleCard } from "../components/ArticleCard";
import { LeftSidebar, RightSidebar } from "../components/Sidebar";

import siteRoutes from "../Routes";

const Articles = (props) => {
  return (
    <Layout
      pageTitle="Articles"
      routes={siteRoutes}
      leftSidebar={<LeftSidebar routes={siteRoutes} />}
      rightSidebar={<RightSidebar />}
    >
      {Array.from(Array(10).keys()).map((i) => <ArticleCard key={i} contentType="Article" />)}
    </Layout>
  );
}

export default withTheme(Articles);
