import { BiCommentDots, BiLike, BiDislike, BiFlag } from "react-icons/bi";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

export const SingleComment = (props) => {
  return (
    <div className="card border-0 rounded-0 shadow-sm p-3 mb-4">
      <div className="d-flex w-100 align-items-center">
        <div className="d-flex align-items-center">
          <img
            src="/person.png"
            width="40"
            height="40"
            alt="user avatar"
            className="img-fluid rounded-circle border bg-secondary"
          />
          <span className="ms-2">
            <Link to="#" className="td-none fsize-14 text-dark">
              Akash Raj Dahal
            </Link>
          </span>
          <span className="badge bg-info ms-3">Level 5</span>
        </div>
        <small className="text-muted ms-auto">12hr ago</small>
      </div>
      <div className="text-muted fsize-14 mt-3">
        <p>
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. In sequi
          deserunt fugit accusamus mollitia ipsa doloremque perferendis officiis
          unde, fuga nemo deleniti distinctio repudiandae. Eveniet blanditiis
          assumenda aut expedita, quia, fugiat, commodi ipsam impedit est
          suscipit amet quod iste alias porro veniam in a ducimus? Doloribus,
          unde expedita? Et, delectus!
        </p>
      </div>
      <hr />
      <div className="d-flex flex-md-row flex-column w-100 align-items-md-center">
        <div className="d-flex align-items-center">
          <div className="d-flex align-items-top">
            <BiCommentDots />
            <span className="ms-1 small text-dark">Reply</span>
          </div>
          <div className="d-flex ms-3">
            <BiLike />
            <span className="ms-1 small text-dark">12.2k</span>
          </div>
          <div className="d-flex ms-3">
            <BiDislike />
            <span className="ms-1 small text-dakr">1k</span>
          </div>
        </div>
        <div className="ms-sm-auto mt-2 mt-md-0">
          <div className="d-flex align-items-center">
            <div className="d-flex">
              <BiFlag />
            </div>
            <span className="ms-1 small text-dark">Report</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export const CommentsSection = (props) => {
  const { t } = useTranslation();

  return (
    <>
    <h6 className="mt-4 pt-md-3 text-dark">{t("Comments")}</h6>
    <div className="d-flex flex-column my-4" id="comments-section">
      {props.children}
    </div>
    </>
  );
}

export const PostComment = (props) => {
  const { t } = useTranslation();

  return (
    <form className="d-flex flex-row">
      <img
        src="/person.png"
        alt="User"
        width="35"
        className="img-fluid rounded-circle border flex-grow-0 flex-shrink-0"
      />
      <input
        type="text"
        placeholder={`${t("Add your comment")}..`}
        className="form-control fsize-14 rounded-0 ms-2 flex-fill"
      />
      <button className="btn btn-primary rounded-0 px-4 ms-2 fsize-14 flex-grow-0 flex-shrink-0">
        {t("Comment")}
      </button>
    </form>
  );
}
