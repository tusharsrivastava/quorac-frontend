import { useState, useCallback } from "react";
import { withTheme } from "styled-components";
import { useTranslation } from "react-i18next";
import { Link, withRouter } from 'react-router-dom';
import { auth } from "../app/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import {
  BiSearchAlt2,
  BiGlobe,
  BiBell,
  BiDollar,
  BiEdit,
  BiLogInCircle,
} from "react-icons/bi";
import { languages } from "../i18n";

const ProfileLink = (props) => {
  const [isActive, setIsActive] = useState(false);

  const toggleMenu = useCallback(() => {
    setIsActive(!isActive);
  }, [isActive]);

  return (
    <div className="dropdown">
      <button
        className="btn btn-link p-0 text-dark"
        onClick={() => toggleMenu()}
      >
        <img
          src="/person.png"
          width="20"
          height="20"
          alt="user avatar"
          className="img-fluid rounded-circle bg-secondary"
        />
      </button>
      <ul
        className={
          "dropdown-menu dropdown-menu-end mt-2 py-0 " +
          (isActive ? "show" : "")
        }
        aria-labelledby="profileDropLink"
      >
        <li>
          <Link
            className="dropdown-item px-3 py-2 border-0 fsize-14"
            to="/profile"
          >
            Profile
          </Link>
        </li>
        <li>
          <Link to="/auth/logout" className="dropdown-item px-3 py-2 border-0 fsize-14">
            Logout
          </Link>
        </li>
      </ul>
    </div>
  );
}

const LangSwitcher = (props) => {
  const [isActive, setIsActive] = useState(false);
  const { i18n } = useTranslation();

  const toggleMenu = useCallback(() => {
    setIsActive(!isActive);
  }, [isActive]);

  return (
    <div className="dropdown">
      <button
        className="btn btn-link p-0 text-dark"
        onClick={() => toggleMenu()}
      >
        <BiGlobe />
      </button>
      <ul
        className={
          "dropdown-menu dropdown-menu-end mt-2 py-0 " +
          (isActive ? "show" : "")
        }
        aria-labelledby="profileDropLink"
      >
        {languages.map((lang) => {
          let lprops = { key: lang.key };
          lprops["className"] =
            "p-2 d-flex justify-content-between align-items-baseline";

          if (i18n.language === lang.key)
            lprops["className"] += " bg-primary text-white";
          return (
            <li {...lprops} onClick={() => i18n.changeLanguage(lang.key)}>
              {lang.name}
              <span className="badge bg-secondary rounded-0 text-dark">
                {lang.icon}
              </span>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

const _Navbar = (props) => {
  const { t } = useTranslation();
  const { routes, match } = props;
  // eslint-disable-next-line no-unused-vars
  const [user, loading, error] = useAuthState(auth);

  return (
    <header className="sticky-top">
      <nav className="container-xl navbar">
        <div className="d-flex align-items-center w-100">
          <Link className="navbar-brand" to="/">
            <span className="d-inline-block px-2">{t("appTitle")} &trade;</span>
          </Link>
          <div className="d-flex justify-content-between w-100" id="headerWrap">
            <ul className="list-unstyled d-md-flex align-items-center mb-0 navigation-links ms-md-5">
              {routes
                .filter((r) => r.showInNav)
                .map((route) => {
                  return (
                    <li key={`nav_${route.path}`}>
                      <Link
                        to={route.path}
                        className={
                          match.path === route.path
                            ? "active td-none mx-xl-3 mx-2 fw-500"
                            : "td-none mx-xl-3 mx-2 fw-500"
                        }
                      >
                        {t(route.title)}
                      </Link>
                    </li>
                  );
                })}
            </ul>

            <form className="d-md-none d-lg-block px-4 w-60">
              <div className="form-group customForm">
                <div className="input-group">
                  <span className="input-group-text" id="basic-addon1">
                    <BiSearchAlt2 />
                  </span>
                  <input
                    type="text"
                    className="form-control"
                    placeholder={t("Search")}
                    aria-label="Search"
                  />
                </div>
              </div>
            </form>

            <Link
              to="/new"
              className="btn btn-primary flex-grow-0 flex-shrink-0"
            >
              <BiEdit /> {t("New Post")}
            </Link>

            <ul className="list-unstyled d-flex align-items-center justify-item-end mb-0 navigation-links">
              <li className="mx-xl-3 mx-2">
                <LangSwitcher />
              </li>
              {loading ? (
                <></>
              ) : user ? (
                <>
                  <li className="mx-xl-3 mx-2">
                    <button className="btn btn-link p-0 text-dark">
                      <BiBell />
                    </button>
                  </li>
                  <li className="mx-xl-3 mx-2">
                    <button className="btn btn-link p-0 text-dark">
                      <BiDollar />
                    </button>
                  </li>
                  <li className="ms-xl-3 ms-2">
                    <ProfileLink />
                  </li>
                </>
              ) : (
                <>
                  <li className="ms-xl-3 mx-2">
                    <Link
                      to="/auth/login"
                      className="btn btn-primary text-white flex-grow-0 flex-shrink-0"
                    >
                      <BiLogInCircle /> {t("Login")}
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </div>
          <div className="ms-auto d-md-none d-block">
            <span
              className="material-icons align-middle fs-2"
              id="sidebarToggle"
            >
              menu
            </span>
          </div>
        </div>
      </nav>
    </header>
  );
}

export const Navbar = withRouter(withTheme(_Navbar));
