import React from "react";
import { navigate } from "../../Library/Constants";
import "./Header.css";

const Header = ({ navigateTo, headerText }) => {
  return (
    <div>
      <div className="headerContainer">
        {navigateTo ? (
          <span
            className="headerNavigate"
            onClick={() => {
              navigate(`/${navigateTo}`);
            }}
          >
            {"<"}
          </span>
        ) : (
          ""
        )}
        <span className="headerText">{headerText}</span>
      </div>
    </div>
  );
};

export default Header;
