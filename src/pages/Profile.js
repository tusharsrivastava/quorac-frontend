import { withTheme } from "styled-components";
import siteRoutes from "../Routes";
import { Layout } from '../components/Layout';
// import { PollCard } from "../components/PollCard";
import {ProfileCard } from "../components/ProfileCard";
import { useEffect, useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserProfile } from "../app/features/profile";


const ProfileHead = (props) => {
  const [tabs, setTabs] = useState([{
    id: "activity",
    title: "Activity",
    isActive: true,
  }, {
    id: "articles",
    title: "Articles",
    isActive: false,
  }, {
    id: "answers",
    title: "Answers",
    isActive: false,
  }, {
    id: "questions",
    title: "Questions",
    isActive: false,
  }, {
    id: "blogs",
    title: "Blog Posts",
    isActive: false,
  }, {
    id: "polls",
    title: "Polls",
    isActive: false,
  }]);

  const setActive = useCallback((tabId) => {
    setTabs(tabs.map((tab) => ({ ...tab, isActive: tab.id === tabId })));
  }, [tabs]);

  return (<ul className="nav nav-pills mb-3 bg-white shadow-sm" id="pills-tab" role="tablist">
    {tabs.map((tab) => (
      (<li className="nav-item" role="presentation" key={tab.id}>
          <button className={`nav-link px-md-4 ${tab.isActive ? 'active': ''}`} id="pills-activity-tab" data-bs-toggle="pill"
              data-bs-target="#pills-activity" type="button" role="tab" aria-controls="pills-activity" onClick={() => setActive(tab.id)}
              aria-selected={tab.isActive}>{tab.title}</button>
      </li>)
    ))}
  </ul>);
}

const Profile = (props) => {
  const { username } = props.match.params;
  const [isEditable, setIsEditable] = useState(false);
  const dispatch = useDispatch();
  const { user, isLoading, error } = useSelector((state) => state.userProfile);

  useEffect(() => {
    if (username) {
      setIsEditable(false);
      dispatch(fetchUserProfile(username));
    } else {
      setIsEditable(true);
      dispatch(fetchUserProfile());
    }
  }, [username, dispatch]);

  return (
    <>
      <Layout
        pageTitle="Profile"
        routes={siteRoutes}
        leftSidebar={<ProfileCard user={user} isEditable={isEditable} />}
        mainSizes={{ size: null, lg: null, md: "8", sm: "7", extras: "" }}
        leftSidebarSizes={{
          size: null,
          lg: null,
          md: "4",
          sm: "5",
          extras: "mb-4",
        }}
        hideRS={true}
      >
        <ProfileHead />
        <div className="text-center">
          <img
            src="/empty.svg"
            alt="No Posts"
            className="img-fluid"
            style={{ maxWidth: "75%" }}
          />
          <h4 className="h4 mt-4">No Activity Available</h4>
        </div>
        {/* {Array.from(Array(5).keys()).map((i) => (
          <PollCard key={i} isLive={(Math.round(100*Math.random()) > 20)} />
        ))} */}
      </Layout>
    </>
  );
};

export default withTheme(Profile);
