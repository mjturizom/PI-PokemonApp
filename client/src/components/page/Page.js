import React from "react";
import "./Page.css";
export default function Page({ nPages, Page }) {
  return (
    <nav>
      <ul className="pag">
        {nPages &&
          nPages.map((page) => {
            return (
              <li className="liPges" key={page} onClick={() => Page(page)}>
                {page}
              </li>
            );
          })}
      </ul>
    </nav>
  );
}
