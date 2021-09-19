import { withRouter } from "react-router";
import { useEffect, useState, useCallback } from "react";
import { ListView } from "../primitives/ListView";
import { Footer } from "../primitives/Footer";
import { AdPlaceholder, AppDownloadLinks, JoiningBonus } from "../primitives/AppPrimitives";
import { TabView } from "../primitives/TabView";
import { useTranslation } from "react-i18next";
import { useSelector, useDispatch } from "react-redux";
import { fetchCategories, setActiveCategory, toggleFollowCategory } from "../app/features/categories";

const _LeftSidebar = (props) => {
  const { t } = useTranslation();
  const dispatch =  useDispatch();
  const { categories, isLoading } = useSelector(state => state.categories);

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  const setCategory = useCallback((e, cat) => {
    e.preventDefault();
    e.stopPropagation();
    dispatch(setActiveCategory(cat.key));
    return false;
  }, [dispatch]);

  const toggleFollow = useCallback((e, cat) => {
    e.preventDefault();
    e.stopPropagation();
    dispatch(toggleFollowCategory(cat.id));
    return false;
  }, [dispatch]);

  return (
    <>
      <ListView title={t("Categories")} list={categories} onToggleFollow={toggleFollow} onSelect={setCategory} isLoading={isLoading} />
      <Footer routes={props.routes} />
    </>
  );
};

export const LeftSidebar = withRouter(_LeftSidebar);

const _RightSidebar = (props) => {
  const { t } = useTranslation();
  const [trendings, setTrendings] = useState([]);
  const [featured, setFeatured] = useState([]);

  useEffect(() => {
    const trendings = [
      {
        title: t("Articles"),
        key: "articles",
        active: true,
        view: <>Trending Articles</>,
      },
      {
        title: t("Answers"),
        key: "answers",
        active: false,
        view: <>Trending Answers</>,
      },
      {
        title: t("Polls"),
        key: "polls",
        active: false,
        view: <>Trending Polls</>,
      },
    ];
    const featured = [
      {
        title: t("Articles"),
        key: "articles",
        active: true,
        view: <>Featured Articles</>,
      },
      {
        title: t("Answers"),
        key: "answers",
        active: false,
        view: <>Featured Answers</>,
      },
      {
        title: t("Polls"),
        key: "polls",
        active: false,
        view: <>Featured Polls</>,
      },
    ];
    setTrendings(trendings);
    setFeatured(featured);
  }, [t])

  return (
    <>
      <JoiningBonus />
      <AdPlaceholder />
      <AppDownloadLinks />
      <TabView title={t("Trending")} sections={trendings} />
      <AdPlaceholder />
      <TabView title={t("Featured")} sections={featured} />
    </>
  );
};

export const RightSidebar = withRouter(_RightSidebar);
