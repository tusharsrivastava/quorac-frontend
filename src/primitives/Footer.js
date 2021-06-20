import { Link } from "react-router-dom";

export const Footer = (props) => {
  const { routes } = props;

  return (
    <div className="card shadow-sm border-0 rounded-0 bg-white px-2 py-3">
      <ul className="list-unstyled d-flex flex-wrap marker-list mb-0">
        {routes
          .filter((r) => r.showInFooter)
          .map((route) => {
            return (
              <li key={`footer_${route.path}`}>
                <Link to={route.path} className="td-none fsize-14 ps-3">
                  {route.title}
                </Link>
              </li>
            );
          })}
      </ul>
    </div>
  );
};
