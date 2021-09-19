import { BiCommentDots, BiLike, BiDislike, BiFlag } from "react-icons/bi";
import { Link } from "react-router-dom";
import { Formik } from "formik";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { addComment } from "../app/features/singlepost";
import Moment from "react-moment";

export const SingleComment = (props) => {
  const { comment } = props;

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
            <Link
              to={`/profile/${comment.postedBy.username}`}
              className="td-none fsize-14 text-dark"
            >
              {comment.postedBy.firstName} {comment.postedBy.lastName}
            </Link>
          </span>
          <span className="badge bg-danger ms-3">Level 5</span>
        </div>
        <small className="text-muted ms-auto">
          <Moment fromNow>{comment.createdAt}</Moment>
        </small>
      </div>
      <div className="text-muted fsize-14 mt-3">
        <p>{comment.content}</p>
      </div>
      <hr />
      <div className="d-flex flex-md-row flex-column w-100 align-items-md-center">
        <div className="d-flex align-items-center">
          <div className="d-flex align-items-top">
            <BiCommentDots />
            <span className="ms-1 small text-dark">Reply</span>
          </div>
          <div className="d-flex ms-3">
            <BiLike
              onClick={props.onUpvote}
              style={{ cursor: "pointer" }}
              className={comment.hasUpvoted ? `text-success` : ``}
            />
            <span className="ms-1 small text-dark">{comment.upvotes}</span>
          </div>
          <div className="d-flex ms-3">
            <BiDislike
              onClick={props.onDownvote}
              style={{ cursor: "pointer" }}
              className={comment.hasDownvoted ? `text-danger` : ``}
            />
            <span className="ms-1 small text-dakr">{comment.downvotes}</span>
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
  const { postId } = props;
  const dispatch = useDispatch();

  return (
    <Formik
      initialValues={{ comment: "" }}
      validate={values => {
         const errors = {};
         if (!values.comment) {
           errors.comment = 'Comment Text is Required';
         }
         return errors;
      }}
      onSubmit={(values, { setSubmitting }) => {
        dispatch(addComment({ postId: postId, comment: values.comment }));
      }}
    >
      {({ values, errors, touched, handleSubmit, handleChange, isSubmitting }) => (
        <form className="d-flex flex-row" onSubmit={handleSubmit}>
          <img
            src="/person.png"
            alt="User"
            width="35"
            className="img-fluid rounded-circle border flex-grow-0 flex-shrink-0"
          />
          <input
            type="text"
            name="comment"
            placeholder={`${t("Add your comment")}..`}
            onChange={handleChange}
            value={values.comment}
            className="form-control fsize-14 rounded-0 ms-2 flex-fill"
          />
          {errors.comment && touched.comment && errors.comment}
          <button
            className="btn btn-primary rounded-0 px-4 ms-2 fsize-14 flex-grow-0 flex-shrink-0"
            disabled={isSubmitting}
          >
            {t("Comment")}
          </button>
        </form>
      )}
    </Formik>
  );
}
