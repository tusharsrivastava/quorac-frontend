import { withTheme } from "styled-components";
import { Layout } from "../components/Layout";
import { Post } from "../components/Post";
import { LeftSidebar, RightSidebar } from "../components/Sidebar";

import siteRoutes from "../Routes";
import { CommentsSection, PostComment, SingleComment } from "../components/ArticleComments";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchSinglePost } from "../app/features/singlepost";

const SingleArticle = (props) => {
  const { id } = props.match.params;
  const { post, comments } = useSelector(state => state.singlePost);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchSinglePost(id));
  },[dispatch, id]);

  return (
    <Layout
      routes={siteRoutes}
      hideLS={true}
      mainSizes={{ size: null, lg: null, md: "9", sm: "8", extras: "" }}
      leftSidebar={<LeftSidebar routes={siteRoutes} />}
      rightSidebar={<RightSidebar />}
    >
      <Post post={post} />
      <PostComment />
      <CommentsSection>
        {comments.length > 0 &&
          comments.map((comment) => (
            <SingleComment key={comment.id} comment={comment} />
          ))}
        {comments.length === 0 && (
          <div className="text-center">
            <img
              src="/empty.svg"
              alt="No Comments"
              className="img-fluid"
              style={{ maxWidth: "60%" }}
            />
            <h4 className="h4 mt-4">No Comments Posted Yet</h4>
          </div>
        )}
      </CommentsSection>
    </Layout>
  );
};

export default withTheme(SingleArticle);
