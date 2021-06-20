import { withTheme } from "styled-components";
import siteRoutes from "../Routes";
import { Layout } from '../components/Layout';
import { PollCard } from "../components/PollCard";
import {ProfileCard } from "../components/ProfileCard";


const ProfileHead = (props) => {
  return (<ul className="nav nav-pills mb-3 bg-white shadow-sm" id="pills-tab" role="tablist">
      <li className="nav-item" role="presentation">
          <button className="nav-link px-md-4 active" id="pills-activity-tab" data-bs-toggle="pill"
              data-bs-target="#pills-activity" type="button" role="tab" aria-controls="pills-activity"
              aria-selected="true">Activity</button>
      </li>
      <li className="nav-item" role="presentation">
          <button className="nav-link px-md-4" id="pills-article-tab" data-bs-toggle="pill"
              data-bs-target="#pills-article" type="button" role="tab" aria-controls="pills-article"
              aria-selected="false">Article</button>
      </li>
      <li className="nav-item" role="presentation">
          <button className="nav-link px-md-4" id="pills-answer-tab" data-bs-toggle="pill"
              data-bs-target="#pills-answer" type="button" role="tab" aria-controls="pills-answer"
              aria-selected="false">Answer</button>
      </li>
      <li className="nav-item" role="presentation">
          <button className="nav-link px-md-4" id="pills-question-tab" data-bs-toggle="pill"
              data-bs-target="#pills-question" type="button" role="tab" aria-controls="pills-question"
              aria-selected="false">Question</button>
      </li>
      <li className="nav-item" role="presentation">
          <button className="nav-link px-md-4" id="pills-blog-tab" data-bs-toggle="pill"
              data-bs-target="#pills-blog" type="button" role="tab" aria-controls="pills-blog"
              aria-selected="false">Blog</button>
      </li>
      <li className="nav-item" role="presentation">
          <button className="nav-link px-md-4" id="pills-poll-tab" data-bs-toggle="pill"
              data-bs-target="#pills-poll" type="button" role="tab" aria-controls="pills-poll"
              aria-selected="false">Poll</button>
      </li>
  </ul>);
}

const Profile = (props) => {
  return (
    <>
      <Layout
        pageTitle="Profile"
        routes={siteRoutes}
        leftSidebar={<ProfileCard />}
        mainSizes={{ size: null, lg: null, md: "8", sm: "7", extras: "" }}
        leftSidebarSizes={{ size: null, lg: null, md: "4", sm: "5", extras: "mb-4"  }}
        hideRS={true}
      >
        <ProfileHead />
        {Array.from(Array(5).keys()).map((i) => (
          <PollCard key={i} isLive={(Math.round(100*Math.random()) > 20)} />
        ))}
      </Layout>
    </>
  );
};

export default withTheme(Profile);
