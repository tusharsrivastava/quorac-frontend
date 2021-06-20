import { useState, useEffect } from "react";
import { withTheme } from "styled-components";
import { Container, Row, Col } from "../primitives/Container";
import { Navbar } from "../components/Navbar";
import { useTranslation } from "react-i18next";

const _Layout = (props) => {
  const { t } = useTranslation();

  const { routes, pageTitle } = props;
  const { hideLS, hideRS } = props;
  const { leftSidebarSizes, rightSidebarSizes, mainSizes } = props;
  const {leftSidebar, rightSidebar, children} = props;
  const [ls, setls] = useState({ size: null, lg: "2", sm: "3", md: "3", extras: "" });
  const [rs, setrs] = useState({ size: "12", lg: "3", sm: null, md: null, extras: "" });
  const [ms, setms] = useState({ size: "12", lg: "7", sm: "8", md: "9", extras: "" });

  useEffect(() => {
    if (leftSidebarSizes) {
      const newLs = {size: null, lg: "2", sm: "3", md: "3", extras: "", ...leftSidebarSizes};
      setls(newLs);
    }
    if (rightSidebarSizes) {
      const newRs = {size: "12", lg: "3", sm: null, md: null, extras: "", ...rightSidebarSizes};
      setrs(newRs);
    }
    if (mainSizes) {
      const newMs = {size: "12", lg: "7", sm: "8", md: "9", extras: "", ...mainSizes};
      setms(newMs);
    }
  }, [leftSidebarSizes, rightSidebarSizes, mainSizes]);

  return (
    <>
      <Navbar routes={routes} />
      <Container>
        <Row className="my-4">
          <h5 className="mb-4">{t(pageTitle)}</h5>
          {hideLS ? (<></>) : (
            <Col size={ms.size} lg={ls.lg} md={ls.md} sm={ls.sm} className={`order-2 order-sm-1 ${ls.extras}`}>
              <div className="d-flex flex-column">
                {leftSidebar}
              </div>
            </Col>
          )}
          <Col size={ms.size} lg={ms.lg} md={ms.md} sm={ms.sm} className={`order-1 order-sm-2 ${ms.extras}`}>
            {children}
          </Col>
          {hideRS ? (<></>):(
            <Col size={rs.size} lg={rs.lg} md={rs.md} sm={rs.sm} className={`order-3 ${rs.extras}`}>
              {rightSidebar}
            </Col>
          )}
        </Row>
      </Container>
    </>
  );
};

export const Layout = withTheme(_Layout);
