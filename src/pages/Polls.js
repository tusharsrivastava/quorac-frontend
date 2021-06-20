import { withTheme } from "styled-components";
import siteRoutes from "../Routes";
import { Layout } from '../components/Layout';
import { LeftSidebar, RightSidebar } from "../components/Sidebar";
import { PollCard } from "../components/PollCard";

const Polls = (props) => {
  return (
    <>
      <Layout
        pageTitle="Polls"
        routes={siteRoutes}
        leftSidebar={<LeftSidebar routes={siteRoutes} />}
        rightSidebar={<RightSidebar />}
      >
        {Array.from(Array(5).keys()).map((i) => (
          <PollCard key={i} isLive={(Math.round(100*Math.random()) > 20)} />
        ))}
      </Layout>
    </>
  );
};

export default withTheme(Polls);
