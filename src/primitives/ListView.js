import React from 'react';
import { BiDotsHorizontal } from "react-icons/bi";

const _ListView = (props) => {
  const { title, list, onSelect } = props;

  return (
    <>
      <div className="card shadow-sm mb-4 border-0 rounded-0 bg-white">
        <h6 className="p-3 mb-0">{title}</h6>
        <ul className="list-unstyled pl-0 mb-3 link-box px-1">
          {list.map((li) => {
            return (
              <li className={li.active ? "d-flex active": "d-flex"} key={`lv_${li.key}`}>
                <a
                  href={`#${li.key}`}
                  onClick={(e) => onSelect(e, li)}
                  className={
                    li.active
                      ? "td-none px-3 py-2"
                      : "td-none px-3 py-2"
                  }
                >
                  {li.title}
                </a>
                {
                  li.actions?.map((action) => {
                    return (<button key={`lva_${action.title}`} className={`flex-grow-0 flex-shrink-0 btn fsize-14 text-${action.theme}`}>{action.title}</button>)
                  })
                }
              </li>
            );
          })}
        </ul>
        <div className="text-center">
          <button className="btn p-0">
            <BiDotsHorizontal />
          </button>
        </div>
      </div>
    </>
  );
};

export const ListView = React.memo(_ListView);
