import React, { useState, useCallback, useEffect } from 'react';

const _TabView = (props) => {
  const { title, sections } = props;
  const [ localSections, setLocalSections] = useState(sections);
  const [ activeSection,  setActiveSection ] = useState(<></>);

  useEffect(() => {
    const sec = sections.map((c) => {
      return {
        ...c,
        active: false,
      };
    });
    if (sections.length > 0) {
      sec[0].active = true;
      setActiveSection(sec[0].view);
    }
    setLocalSections(sections);
  }, [sections]);

  const makeSectionActive = useCallback((activeSection) => {
    const sec = localSections.map((c) => {
      return {
        ...c,
        active: false,
      };
    });
    sec.forEach((c) => {
      if (c.key === activeSection.key) {
        c.active = true;
      }
    });
    setLocalSections(sec);
    setActiveSection(activeSection.view);
  }, [localSections]);

  return (
    <div className="card shadow-sm mb-4 border-0 rounded-0 bg-white">
      <h6 className="p-3 mb-1">{title}</h6>
      <ul
        className="nav nav-pills mb-3 mx-3 border-bottom card-trending"
        role="tablist"
      >
        {localSections.map((section) => {
          return (<li key={section.key} className="nav-item" role="presentation">
          <button
            className={section.active ? "nav-link small px-2 py-1 active":"nav-link small px-2 py-1"}
            type="button"
            role="tab"
            aria-controls="pills-article"
            aria-selected={section.active ? "true": "false"}
            onClick={() => makeSectionActive(section)}
          >
            {section.title}
          </button>
          </li>);
        })}
      </ul>
      <div className="tab-content mx-3 mb-4" id="pills-tabContent">
        <div
          className="tab-pane fade show active"
          role="tabpanel"
          aria-labelledby="pills-article-tab"
        >{activeSection}</div>
      </div>
    </div>
  );
}

export const TabView = React.memo(_TabView);
