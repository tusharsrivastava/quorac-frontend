import { withTheme } from "styled-components";
import { Layout } from "../components/Layout";
import { LeftSidebar, RightSidebar } from "../components/Sidebar";

import siteRoutes from "../Routes";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { PostCreator } from "../components/PostCreator";
import { Formik } from "formik";
import { postNewAnswer, resetRedirect } from "../app/features/newpost";
import { Redirect } from "react-router";
import { useEffect } from "react";

const Answer = (props) => {
  const { id } = props.match.params;
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { redirectTo } = useSelector((state) => state.newPost);

  useEffect(() => {
    if (redirectTo !== null) {
      dispatch(resetRedirect());
    }
  }, [dispatch, redirectTo]);

  if (redirectTo) {
    return <Redirect to={redirectTo} />;
  }

  return (
    <Layout
      routes={siteRoutes}
      hideLS={true}
      showTitle={true}
      pageTitle="Post New Answer"
      mainSizes={{ size: null, lg: null, md: "9", sm: "8", extras: "" }}
      leftSidebar={<LeftSidebar routes={siteRoutes} />}
      rightSidebar={<RightSidebar />}
    >
      <Formik
        initialValues={{ content: "" }}
        validate={(values) => {
          const errors = {};
          if (!values.content) {
            errors.content = "Answer Content is Required";
          }
          return errors;
        }}
        onSubmit={(values, { setSubmitting }) => {
          setSubmitting(true);
          console.log(values);
          dispatch(postNewAnswer({ postId: id, content: values.content }));
        }}
      >
        {({
          values,
          errors,
          touched,
          handleSubmit,
          handleChange,
          isSubmitting,
        }) => (
          <form className="d-flex flex-column" onSubmit={handleSubmit}>
            <PostCreator
              name="content"
              isHtml={true}
              value={values.content}
              onChange={handleChange}
            />
            <button
              type="submit"
              className="btn btn-primary rounded-0 px-4 mt-4 fsize-14 flex-grow-0 flex-shrink-0"
              disabled={isSubmitting}
            >
              {t("Post Answer")}
            </button>
          </form>
        )}
      </Formik>
    </Layout>
  );
};

export default withTheme(Answer);
