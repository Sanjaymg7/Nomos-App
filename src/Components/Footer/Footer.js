import React, { useState } from "react";
import { home, inbox } from "../../Library/Constants";
import Image from "../Image/Image";
import "./Footer.css";
import { useNavigate } from "react-router-dom";
import MenuComp from "../Menu/Menu/MenuComp";

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
          <Image
            onClick={() => navigate(home)}
            className="footer-image"
            src="https://cdn.zeplin.io/5ee1133b3c75ae9aea1e8b2f/assets/0DD39DDA-F1F6-4734-B794-AEED1FFA7AF9.png"
            alt="footer-image"
          />
          <div onClick={menuHandler} className="menu-btn">
            +
          </div>
          <Image
            onClick={() => navigate(inbox)}
            className="footer-image"
            src="https://cdn.zeplin.io/5ee1133b3c75ae9aea1e8b2f/assets/BFAA1882-80B9-49F7-B412-4788306C01BD.png"
            alt="inbox-image"
          />
        </div>
      )}
    </>
  );
};

export default Footer;
