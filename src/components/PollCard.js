import { useTranslation } from "react-i18next";
import {
  BiUpArrowAlt,
  BiDownArrowAlt,
  BiCommentDots,
  BiCheckDouble,
  BiDotsVertical,
} from "react-icons/bi";
import { Link } from "react-router-dom";

export const PollCard = (props) => {
  const { isLive } = props;
  const { t } = useTranslation();

  return (
    <div className="card shadow-sm mb-4 border-0 rounded-0 bg-white p-4">
      <div className="d-flex mb-3">
        <div className="d-flex flex-column align-items-center pe-3">
          <div className="d-flex align-items-center">
            <img
              src="/person.png"
              width="30"
              height="30"
              alt="user avatar"
              style={{ padding: "0.1rem" }}
              className="img-fluid rounded-circle bg-primary"
            />
          </div>
        </div>
        <div className="d-flex flex-column">
          <div className="d-flex justify-content-between align-items-baseline">
            <p className="mb-3 fsize-14 fw-700 pe-3">
              <Link to="/profile" className="td-none text-primary">
                Akash Raj Dahal
              </Link>
            </p>
            <span className="badge bg-danger rounded-0 text-light">Level 5</span>
            <small className="text-muted ms-md-4 ms-2">Posted: 12hr ago</small>
          </div>
        </div>
      </div>
      <div className="d-flex">
        <div className="d-flex flex-column align-items-center pe-4">
          <BiUpArrowAlt size="1.25rem" />
          <span className="text-primary">16</span>
          <BiDownArrowAlt size="1.25rem" />
        </div>
        <div className="d-flex flex-column flex-fill">
          <div className="d-flex justify-content-between align-items-baseline">
            <h1 className="fs-5 mb-3">
              <Link to="#" className="td-none text-dark">
                What does the fox say?
              </Link>
            </h1>
            <span className="badge bg-secondary rounded-0 text-dark"><small>{t("Poll")}</small></span>
          </div>
          {isLive ? (
            <div className="poll-buttons my-3">
              <button className="btn btn-outline-primary w-100 mb-3 fsize-14 px-5 py-2">
                Option A to be
              </button>
              <button className="btn btn-outline-primary w-100 mb-3 fsize-14 px-5 py-2">
                Option B to be
              </button>
            </div>
          ) : (
            <div className="poll-buttons my-3">
              <div className="mb-2">
                <small className="text-dark">Option A to be</small>
                <div className="progress" style={{height: "20px"}}>
                  <div className="progress-bar bg-danger" role="progressbar" style={{width: "25%"}} aria-valuenow="25" aria-valuemin="0" aria-valuemax="100">
                  25%
                  </div>
                </div>
              </div>
              <div className="mb-2">
                <small className="text-dark">Option B to be</small>
                <div className="progress" style={{height: "20px"}}>
                  <div className="progress-bar bg-success" role="progressbar" style={{width: "67%"}} aria-valuenow="25" aria-valuemin="0" aria-valuemax="100">
                  67%
                  </div>
                </div>
              </div>
            </div>
          )}
          <hr />
          <div className="d-flex flex-md-row flex-column w-100 align-items-md-center">
            <div className="ms-sm-auto mt-2 mt-md-0">
              <div className="d-flex align-items-center">
                <div className="d-flex">
                  <BiCommentDots />
                  <span className="ms-1 small text-muted">50+</span>
                </div>
                <div className="d-flex ms-3">
                  <BiCheckDouble />
                  <span className="ms-1 small text-muted">1.2k</span>
                </div>
                <div className="d-flex ms-3">
                  <BiDotsVertical />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
