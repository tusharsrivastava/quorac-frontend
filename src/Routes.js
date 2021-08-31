import React from 'react';

const siteRoutes = [
  {
    path: "/trending",
    title: "Trending",
    comp: React.lazy(() => import("./pages/Home")),
    showInNav: true,
    showInFooter: false,
  },
  {
    path: "/articles",
    title: "Articles",
    comp: React.lazy(() => import("./pages/Articles")),
    showInNav: true,
    showInFooter: false,
  },
  {
    path: "/answers",
    title: "Answers",
    comp: React.lazy(() => import("./pages/Answers")),
    showInNav: true,
    showInFooter: false,
  },
  {
    path: "/blog",
    title: "Blog",
    comp: React.lazy(() => import("./pages/Blogs")),
    showInNav: true,
    showInFooter: false,
  },
  {
    path: "/polls",
    title: "Polls",
    comp: React.lazy(() => import("./pages/Polls")),
    showInNav: true,
    showInFooter: false,
  },
  {
    path: "/about",
    title: "About",
    comp: React.lazy(() => import("./pages/Home")),
    showInNav: false,
    showInFooter: true,
  },
  {
    path: "/terms",
    title: "Terms",
    comp: React.lazy(() => import("./pages/Home")),
    showInNav: false,
    showInFooter: true,
  },
  {
    path: "/ad-choices",
    title: "AdChoices",
    comp: React.lazy(() => import("./pages/Home")),
    showInNav: false,
    showInFooter: true,
  },
  {
    path: "/career",
    title: "Careers",
    comp: React.lazy(() => import("./pages/Home")),
    showInNav: false,
    showInFooter: true,
  },
  {
    path: "/privacy",
    title: "Privacy",
    comp: React.lazy(() => import("./pages/Home")),
    showInNav: false,
    showInFooter: true,
  },
  {
    path: "/help",
    title: "Help",
    comp: React.lazy(() => import("./pages/Home")),
    showInNav: false,
    showInFooter: true,
  },
  {
    path: "/profile",
    title: "Profile",
    comp: React.lazy(() => import("./pages/Profile")),
    showInNav: false,
    showInFooter: false,
  },
  {
    path: "/article/:id",
    title: "Article",
    comp: React.lazy(() => import("./pages/SingleArticle")),
    showInNav: false,
    showInFooter: false,
  },
  {
    path: "/new",
    title: "Create New Post",
    comp: React.lazy(() => import("./pages/NewPost")),
    showInNav: false,
    showInFooter: false,
  },
  {
    path: "/answer/:id",
    title: "Post New Answer",
    comp: React.lazy(() => import("./pages/Answer")),
    showInNav: false,
    showInFooter: false,
  },
];

export const defaultRoute = siteRoutes[0];

export default siteRoutes;
