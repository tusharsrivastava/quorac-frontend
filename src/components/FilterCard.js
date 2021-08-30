import { useDispatch, useSelector } from "react-redux";
import { withRouter } from "react-router";
import { Link } from "react-router-dom";
import { toggleSubCategoryActive } from "../app/features/subcategories";

const FilterCard = (props) => {
    const dispatch = useDispatch();
    const { subcategories, title, isVisible } = useSelector(state => state.subcategories);

    if (!isVisible) {
      return <></>;
    }

    return (
      <div className="card shadow-sm mb-4 border-0 rounded-0 bg-white p-3">
        <div className="d-flex mb-2">
          <h6 className="fs-6">
            <Link to="/article/1" className="td-none text-dark">
              {title}
            </Link>
          </h6>
        </div>
        <div className="d-flex mb-3 flex-wrap">
          {subcategories && subcategories.map(subcat => {
            return (
            <span
              onClick={() => dispatch(toggleSubCategoryActive(subcat.key))}
              key={subcat.key}
              className={`badge cursor-pointer rounded-0 me-2 mb-2 ${subcat.isActive?'bg-primary text-light':'bg-secondary text-dark'}`}>
              <small>{subcat.title}</small>
            </span>);
          })}
        </div>
      </div>
    );
}

export default withRouter(FilterCard);
