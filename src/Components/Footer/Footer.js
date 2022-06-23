import React, { useState } from "react";
import "./Footer.css";
import { useNavigate } from "react-router-dom";
import MenuComp from "../Menu/Menu/MenuComp";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHouseChimney,
  faUserPlus,
  faPlus,
  faUser,
  faPaperPlane,
} from "@fortawesome/free-solid-svg-icons";

const Footer = () => {
  const navigate = useNavigate();
  const [isMenu, toggleMenu] = useState(false);
  const menuHandler = () => {
    toggleMenu(!isMenu);
  };
  // const footerItems = [
  //   {
  //     icon: faHouseChimney,
  //     onClick: "/home",
  //     className: "font-awesome-active",
  //   },
  //   {
  //     icon: faUserPlus,
  //     onClick: "/searchUser",
  //     className: "font-awesome-active",
  //   },
  //   {
  //     icon: faPlus,
  //     onClick: menuHandler(),
  //     className: "menu-icon",
  //   },
  //   {
  //     icon: faUser,
  //     onClick: "/acceptUser",
  //     className: "font-awesome-active",
  //   },
  //   {
  //     icon: faPaperPlane,
  //     onClick: "/inbox",
  //     className: "font-awesome-active",
  //   },
  // ];

  return (
    <>
      {isMenu ? (
        <MenuComp toggleMenu={toggleMenu} />
      ) : (
        <div className="footer">
          {/* {footerItems.map((item, index) => {
            <FontAwesomeIcon
              key={index}
              icon={item.icon}
              onClick={() =>
                index === 2 ? item.onClick : navigate(item.onClick)
              }
              className={item.className}
            />;
          })} */}
          <FontAwesomeIcon
            icon={faHouseChimney}
            onClick={() => navigate("/home")}
            className="font-awesome-active"
          />
          <FontAwesomeIcon
            icon={faUserPlus}
            onClick={() => navigate("/searchUser")}
            className="font-awesome-active"
          />
          <FontAwesomeIcon
            icon={faPlus}
            onClick={() => menuHandler()}
            className="menu-icon"
          />
          <FontAwesomeIcon
            icon={faUser}
            onClick={() => navigate("/acceptUser")}
            className="font-awesome-active"
          />
          <FontAwesomeIcon
            icon={faPaperPlane}
            onClick={() => navigate("/inbox")}
            className="font-awesome-active"
          />
        </div>
      )}
    </>
  );
};

export default Footer;
