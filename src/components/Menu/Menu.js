import React from "react";
import { Link, Location } from "@reach/router";

const Menu = props => {
  console.log(props);
  return (
    <Location>
      {({ location: { pathname } }) => (
        <nav className="bg-light sidebar">
          <div className="sidebar-sticky">
            <ul className="nav flex-column">
              {props.pageLinks.map(({ text, linkTo }, index) => (
                <li key={index} className="nav-item">
                  <Link
                    className={`nav-link ${
                      pathname === linkTo ? "active" : ""
                    }`}
                    to={linkTo}
                  >
                    {text}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </nav>
      )}
    </Location>
  );
};

export default Menu;
