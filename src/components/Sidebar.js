import { withRouter } from "react-router";
import { useEffect, useState, useCallback } from "react";
import { ListView } from "../primitives/ListView";
import { Footer } from "../primitives/Footer";
import { AdPlaceholder, AppDownloadLinks, JoiningBonus } from "../primitives/AppPrimitives";
import { TabView } from "../primitives/TabView";
import { useTranslation } from "react-i18next";

const _LeftSidebar = (props) => {
  const { t } = useTranslation();
  const [ categories, setCategories ] = useState([]);

  useEffect(() => {
    const cats = [
      { title: "Arts and Humanities", key: "art", active: true },
      { title: "Beauty and Style", key: "beauty", active: false },
      { title: "Business and Finance", key: "business", active: false },
      { title: "Cars and Transportation", key: "transport", active: false },
      { title: "Computers and Internet", key: "internet", active: false },
      { title: "Consumer Electronics", key: "electronics", active: false },
    ];
    setCategories(cats);
  }, []);

  const setCategory = useCallback((cat) => {
    const cats = categories.map(c => {
      return {
        ...c,
        active: false,
      };
    });
    cats.forEach(c => {
      if (c.key === cat.key) {
        c.active = true;
      }
    });
    setCategories(cats);
  }, [categories]);

  return (
    <>
      <ListView title={t("Categories")} list={categories} onSelect={setCategory} />
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
