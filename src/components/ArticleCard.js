import { useTranslation } from "react-i18next";
import {
  BiUpArrowAlt,
  BiDownArrowAlt,
  BiCommentDots,
  BiCheckDouble,
  BiDotsVertical,
} from "react-icons/bi";
import { Link } from "react-router-dom";

export const ArticleCard = (props) => {
  const { t } = useTranslation();
  const { contentType, ...post } = props;

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
            <span className="badge bg-danger rounded-0 text-light">
              Level 5
            </span>
            <small className="text-muted ms-md-4 ms-2">Asked: 12hr ago</small>
          </div>
        </div>
      </div>
      <div className="d-flex">
        <div className="d-flex flex-column align-items-center pe-4">
          <BiUpArrowAlt size="1.25rem" />
          <span className="text-primary">{post.statistics.upvotes}</span>
          <BiDownArrowAlt size="1.25rem" />
        </div>
        <div className="d-flex flex-column w-100">
          <div className="d-flex justify-content-between align-items-baseline">
            <h1 className="fs-5 mb-3">
              <Link to="/article/1" className="td-none text-dark">
                {post.title}
              </Link>
            </h1>
            <span className="badge bg-secondary rounded-0 text-dark">
              <small>{t(contentType)}</small>
            </span>
          </div>
          <p className="text-muted fsize-14 mb-0">
            {post.content}
            <button className="btn text-primary p-0 px-1 fsize-14 td-none">
              Read more..
            </button>
          </p>
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
                Answered by{" "}
                <Link to="/profile" className="td-none text-primary">
                  Akash Raj Dahal
                </Link>
              </small>
              <small className="text-muted ms-md-4 ms-2">12hr ago</small>
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
        </div>
      </div>
    </div>
  );
};
