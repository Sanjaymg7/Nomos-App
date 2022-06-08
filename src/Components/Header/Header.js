import React from "react";
import { useNavigate } from "react-router-dom";
import "./Header.css";

const Header = ({ navigateTo, headerText }) => {
  const navigate = useNavigate();
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
