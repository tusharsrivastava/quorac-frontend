import { useTranslation } from "react-i18next";
import {
  BiUpArrowAlt,
  BiDownArrowAlt,
  BiCommentDots,
  BiCheckDouble,
  BiDotsVertical,
} from "react-icons/bi";
import parse from "html-react-parser";
import { Link } from "react-router-dom";
import Moment from "react-moment";
import { useCallback, useState } from "react";

export const ArticleCard = (props) => {
  const { t } = useTranslation();
  const { contentType, collapsed, ...post } = props;
  const [isCollapsed, setIsCollapsed] = useState(collapsed !== undefined ? collapsed : true);

  const toggleCollapse = useCallback(() => {
    setIsCollapsed((prevState) => !prevState);
  }, []);

  return (
    <div className="card shadow-sm mb-4 border-0 rounded-0 bg-white p-4">
      <div className="d-flex mb-3">
        <div className="d-flex flex-column align-items-center pe-3">
          <div className="d-flex align-items-center">
            <img
              src={`${
                (post.questioner
                  ? post.questioner.profileThumbnail
                  : post.postedBy.profileThumbnail) || "/person.png"
              }`}
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
              <Link
                to={`/profile/${
                  post.questioner
                    ? post.questioner.username
                    : post.postedBy.username
                }`}
                className="td-none text-primary"
              >
                {post.questioner
                  ? `${post.questioner.firstName} ${post.questioner.lastName}`
                  : `${post.postedBy.firstName} ${post.postedBy.lastName}`}
              </Link>
            </p>
            <span className="badge bg-danger rounded-0 text-light">
              Level{" "}
              {post.questioner ? post.questioner.level : post.postedBy.level}
            </span>
            <small className="text-muted ms-md-4 ms-2">
              {post.questioner ? "Asked" : "Posted"}:{" "}
              <Moment fromNow>
                {post.questioner ? post.questioner.on : post.postedBy.on}
              </Moment>
            </small>
          </div>
        </div>
      </div>
      <div className="d-flex">
        <div className="d-flex flex-column align-items-center pe-4">
          <BiUpArrowAlt
            size="1.25rem"
            onClick={props.onUpvote}
            style={{ cursor: "pointer" }}
            className={post.hasUpvoted ? `text-success` : ``}
          />
          <span className="text-primary">{post.statistics.score}</span>
          <BiDownArrowAlt
            size="1.25rem"
            onClick={props.onDownvote}
            style={{ cursor: "pointer" }}
            className={post.hasDownvoted ? `text-danger` : ``}
          />
        </div>
        <div className="d-flex flex-column w-100">
          <div className="d-flex justify-content-between align-items-baseline">
            <h1 className="fs-5 mb-3">
              <Link to={`/article/${post.id}`} className="td-none text-dark">
                {post.title}
              </Link>
            </h1>
            <span className="badge bg-secondary rounded-0 text-dark">
              <small>{t(contentType)}</small>
            </span>
          </div>
          {contentType === "Unanswered" ? (
            <>
              <p className="fsize-14 fw-500 mb-3 unanswered-info">
                {t("This Question is unanswered")}.
              </p>
              <Link
                to={`/answer/${post.id}`}
                className="btn btn-primary flex-grow-0 flex-shrink-0"
              >
                {t("Post an Answer")}
              </Link>
            </>
          ) : (
            <>
              <div className="text-muted fsize-14 mb-0">
                <div
                  className={isCollapsed ? "collapsed" : "collapsed expanded"}
                >
                  {parse(post.content)}
                </div>
                <button
                  className="btn text-primary p-0 px-1 fsize-14 td-none"
                  onClick={toggleCollapse}
                >
                  Read {isCollapsed ? "more" : "less"}..
                </button>
              </div>
              <hr />
              <div className="d-flex flex-md-row flex-column w-100 align-items-md-center">
                <div className="d-flex align-items-center">
                  <img
                    src="/person.png"
                    width="20"
                    height="20"
                    alt="user avatar"
                    className="img-fluid rounded-circle bg-secondary"
                  />
                  <small className="text-muted ms-2">
                    {post.questioner ? "Answered" : "Posted"} by{" "}
                    <Link
                      to={`/profile/${post.postedBy.username}`}
                      className="td-none text-primary"
                    >
                      {post.postedBy.firstName} {post.postedBy.lastName}
                    </Link>
                  </small>
                  <small className="text-muted ms-md-1 ms-0">
                    <Moment fromNow>{post.postedBy.on}</Moment>
                  </small>
                </div>
                <div className="ms-sm-auto mt-2 mt-md-0">
                  <div className="d-flex align-items-center">
                    <div className="d-flex">
                      <BiCommentDots />
                      <span className="ms-1 small text-muted">
                        {post.statistics.comments}
                      </span>
                    </div>
                    <div className="d-flex ms-3">
                      <BiCheckDouble />
                      <span className="ms-1 small text-muted">
                        {post.statistics.views}
                      </span>
                    </div>
                    <div className="d-flex ms-3">
                      <BiDotsVertical />
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
