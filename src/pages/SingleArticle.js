import { withTheme } from "styled-components";
import { Layout } from "../components/Layout";
import { ArticleCard } from "../components/ArticleCard";
import { LeftSidebar, RightSidebar } from "../components/Sidebar";

import siteRoutes from "../Routes";
import { CommentsSection, PostComment, SingleComment } from "../components/ArticleComments";

const SingleArticle = (props) => {
  return (
    <Layout
      routes={siteRoutes}
      hideLS={true}
      mainSizes={{ size: null, lg: null, md: "9", sm: "8", extras: "" }}
      leftSidebar={<LeftSidebar routes={siteRoutes} />}
      rightSidebar={<RightSidebar />}
    >
      <ArticleCard contentType="Article" />
      <PostComment />
      <CommentsSection>
        {Array.from(Array(3).keys()).map(i =>
          <SingleComment key={i} />
        )}
      </CommentsSection>
    </Layout>
  );
};

export default withTheme(SingleArticle);
