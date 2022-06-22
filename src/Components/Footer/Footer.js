import React, { useState } from "react";
import "./Footer.css";
import { useNavigate } from "react-router-dom";
import MenuComp from "../Menu/Menu/MenuComp";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHouseChimney,
  faUserPlus,
  faUser,
  faPaperPlane,
} from "@fortawesome/free-solid-svg-icons";

const Footer = () => {
  const navigate = useNavigate();
  const [isMenu, toggleMenu] = useState(false);
  const menuHandler = () => {
    toggleMenu(!isMenu);
  };

  return (
    <>
      {isMenu ? (
        <MenuComp toggleMenu={toggleMenu} />
      ) : (
        <div className="footer">
          <FontAwesomeIcon
            icon={faHouseChimney}
            onClick={() => navigate("/home")}
            className="font-awesome"
          />
          <FontAwesomeIcon
            icon={faUserPlus}
            onClick={() => navigate("/searchUser")}
            className="font-awesome"
          />
          <div onClick={menuHandler} className="menu-btn">
            +
          </div>
          <FontAwesomeIcon
            icon={faUser}
            onClick={() => navigate("/acceptUser")}
            className="font-awesome"
          />
          <FontAwesomeIcon
            icon={faPaperPlane}
            onClick={() => navigate("/inbox")}
            className="font-awesome"
          />
        </div>
      )}
    </>
  );
};

export default Footer;
