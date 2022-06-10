import React from "react";
import { navigate } from "../../Library/Constants";
import "./Header.css";
import Image from "../Image/Image";

const Header = ({ navigateTo, headerText = "NOMOS" }) => {
  return (
    <div>
      <div className="headerContainer">
        {navigateTo ? (
            <Image
              className="headerNavigate"
              onClick={() => {
                navigate(`/${navigateTo}`);
              }}
              src="https://cdn.zeplin.io/5ee1133b3c75ae9aea1e8b2f/assets/74FC0201-9DD6-4C74-91FD-9F363FA3DF01.png"
              alt="back-btn"
            />
        ) : (
          ""
        )}
        <span className="headerText">{headerText}</span>
      </div>
    </div>
  );
};

export default Header;
