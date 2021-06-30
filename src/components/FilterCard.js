import { useEffect, useState } from "react";
import { withRouter } from "react-router";
import { Link } from "react-router-dom";

const FilterCard = (props) => {
    const { location } = props;
    const [ visible, setVisible ] = useState(false);
    const [ title, setTitle ] = useState("");

    useEffect(()=> {
      if (location?.hash) {
        setVisible(true);
        setTitle(
          location?.hash.slice(1).replace(/(^\w|\s\w)/g, (m) => m.toUpperCase())
        );
      } else {
        setVisible(false);
      }
    }, [location?.hash]);

    if (!visible) {
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
          {Array.from(new Array(10).keys()).map(k => {
            const active = Math.random()*100 > 35;
            return (<span key={k} className={`badge rounded-0 me-2 mb-2 ${active?'bg-primary text-light':'bg-secondary text-dark'}`}>
              <small>Sub Category {k}</small>
            </span>);
          })}
        </div>
      </div>
    );
}

export default withRouter(FilterCard);
