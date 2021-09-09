import { withTheme } from "styled-components";
import { Layout } from "../components/Layout";
import { LeftSidebar, RightSidebar } from "../components/Sidebar";

import siteRoutes from "../Routes";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { PostCreator } from "../components/PostCreator";
import { Formik } from "formik";
import Select from "../components/Select";
import { fetchCategories } from "../app/features/categories";
import { createNewPost, resetRedirect } from "../app/features/newpost";
import { Redirect } from "react-router";
import { useEffect } from "react";
import { showSubCategory } from "../app/features/subcategories";

const NewPost = (props) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { redirectTo } = useSelector((state) => state.newPost);
  const { categories } = useSelector((state) => state.categories);
  const { subcategories } = useSelector((state) => state.subcategories);

  useEffect(() => {
    dispatch(fetchCategories({ type: 'trending', contentType: null }));
  }, [dispatch]);

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
      pageTitle="New Post"
      mainSizes={{ size: null, lg: null, md: "9", sm: "8", extras: "" }}
      leftSidebar={<LeftSidebar routes={siteRoutes} />}
      rightSidebar={<RightSidebar />}
    >
      <Formik
        initialValues={{
          title: "",
          content: "",
          type: "question",
          category: null,
          subcategories: [],
        }}
        validate={(values) => {
          const errors = {};
          if (!values.title) {
            errors.title = "Post Title is Required";
          }
          return errors;
        }}
        onSubmit={(values, { setSubmitting }) => {
          setSubmitting(true);
          console.log(values);
          dispatch(createNewPost(values));
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
            <select
              className="form-select fsize-14 rounded-0 ms-0 mb-4 flex-fill"
              name="type"
              value={values.type}
              onChange={handleChange}
            >
              <option value="question">Question</option>
              <option value="article">Article</option>
              <option value="blog">Blog Post</option>
            </select>
            <Select
              placeholder="Select Category"
              className="fsize-14 rounded-0 ms-0 mb-4"
              options={categories.map((cat) => ({
                value: cat.id,
                label: cat.title,
              }))}
              name="category"
              onChange={(cat) => {
                console.log('OnChange', cat.id);
                dispatch(showSubCategory(cat.id));
              }}
            />
            <Select
              placeholder="Select Sub Categories"
              className="fsize-14 rounded-0 ms-0 mb-4"
              isMulti
              isCreatable
              options={subcategories.map((cat) => ({
                value: cat.id,
                label: cat.title,
              }))}
              name="subcategories"
            />
            <input
              type="text"
              name="title"
              placeholder={`${t("Post Title")}..`}
              onChange={handleChange}
              value={values.title}
              className="form-control fsize-14 rounded-0 ms-0 mb-4 flex-fill"
            />
            {errors.title && touched.title && errors.title}
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
              {t("New Post")}
            </button>
          </form>
        )}
      </Formik>
    </Layout>
  );
};

export default withTheme(NewPost);
