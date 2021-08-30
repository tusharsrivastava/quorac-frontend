import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

export const JoiningBonus = (props) => {
  return (
    <div className="card shadow-sm border-0 rounded-0 bg-white p-4 mb-4">
      <button className="btn btn-primary text-white fsize-14">
        Join us and get 20 bonus points
      </button>
    </div>
  );
}

export const AdPlaceholder = (props) => {
  useEffect(() => {
    (window.adsbygoogle = window.adsbygoogle || []).push({});
  }, []);

  return (
    <div
      className="card shadow-sm border-0 rounded-0 bg-white p-4 mb-4"
      data-type="ad"
    >
      <ins
        className="adsbygoogle"
        style={{"display":"block"}}
        data-ad-client="ca-pub-0695598434578342"
        data-ad-slot="6795062071"
        data-ad-format="auto"
        data-full-width-responsive="true"
      ></ins>
    </div>
  );
}

export const AppDownloadLinks = (props) => {
  const { t } = useTranslation();

  return (
    <div className="card shadow-sm border-0 rounded-0 bg-white p-2 mb-4">
      <h6 className="px-2 py-3 mb-0">{t("Download our App")}</h6>
      <div className="d-flex mb-3 ps-2">
          <Link to="#" className="td-none d-flex align-items-center border py-2 px-3 rounded">
              <div className="img-wrap">
                  <img src="/apple.png" className="img-fluid" width="20" alt="Apple store" />
              </div>
              <div className="d-flex flex-column ms-2">
                  <small className="text-muted fsize-08">iOS App on</small>
                  <span className="text-muted">App Store</span>
              </div>
          </Link>
          <Link to="#" className="td-none d-flex align-items-center border py-2 px-3 rounded ms-1">
              <div className="img-wrap">
                  <img src="/playstore.png" className="img-fluid" width="20" alt="Play store" />
              </div>
              <div className="d-flex flex-column ms-2">
                  <small className="text-muted fsize-08">Android App on</small>
                  <span className="text-muted">Play Store</span>
              </div>
          </Link>
      </div>
    </div>
  );
}
