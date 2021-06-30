import { withRouter } from "react-router";
import { useEffect, useState, useCallback } from "react";
import { ListView } from "../primitives/ListView";
import { Footer } from "../primitives/Footer";
import { AdPlaceholder, AppDownloadLinks, JoiningBonus } from "../primitives/AppPrimitives";
import { TabView } from "../primitives/TabView";
import { useTranslation } from "react-i18next";

const _LeftSidebar = (props) => {
  const { history, location } = props;
  const { t } = useTranslation();
  const [ categories, setCategories ] = useState([]);

  useEffect(() => {
    const cats = [
      { title: "Arts and Humanities", key: "art", active: false, actions: [{
        title: "+Follow (6.4k)", theme: "primary"
      }] },
      { title: "Beauty and Style", key: "beauty", active: false, actions: [{
        title: "+Follow (1.3m)", theme: "primary"
      }]  },
      { title: "Business and Finance", key: "business", active: false, actions: [{
        title: "-Unfollow (3.4k)", theme: "danger"
      }]  },
      { title: "Cars and Transportation", key: "transport", active: false, actions: [{
        title: "+Follow (1.2k)", theme: "primary"
      }]  },
      { title: "Computers and Internet", key: "internet", active: false, actions: [{
        title: "-Unfollow (17.2k)", theme: "danger"
      }]  },
      { title: "Consumer Electronics", key: "electronics", active: false, actions: [{
        title: "+Follow (1.3k)", theme: "primary"
      }]  },
    ];
    setCategories(cats);
  }, []);

  const setCategory = useCallback((e, cat) => {
    const prevSelected = categories.find(c => c.active);
    const cats = categories.map(c => {
      return {
        ...c,
        active: false,
      };
    });
    if (prevSelected !== undefined && prevSelected.key === cat.key) {
      setCategories(cats);
      history.push({ ...location, hash: '' });
      e.preventDefault();
      e.stopPropagation();
    } else {
      cats.forEach(c => {
        if (c.key === cat.key) {
          c.active = true;
        }
      });
      setCategories(cats);
      return true;
    }
  }, [categories, history, location]);

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
