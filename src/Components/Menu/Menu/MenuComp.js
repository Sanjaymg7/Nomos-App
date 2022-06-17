import React from "react";
import MenuCard from "../MenuCard/MenuCard";
import "./MenuComp.css";
import { useNavigate } from "react-router-dom";

const MenuComp = ({ toggleMenu }) => {
  const navigate = useNavigate();
  return (
    <>
      <div className="menu-modal-container"></div>
      <div className="menu-container">
        <MenuCard
          src="https://cdn.zeplin.io/5ee1133b3c75ae9aea1e8b2f/assets/5868239F-2135-4D2C-AF7A-B8F91A25F2D7.png"
          menuContent="Give or receive a service"
          onClick={() => navigate("/post")}
        />
        <MenuCard
          src="https://cdn.zeplin.io/5ee1133b3c75ae9aea1e8b2f/assets/D2C2C345-4727-4FD0-A6B5-7887AE1E89BB.png"
          menuContent="offer or request an item"
          onClick={() => navigate("/itempost")}
        />
        <MenuCard
          src="https://cdn.zeplin.io/5ee1133b3c75ae9aea1e8b2f/assets/649EE7EE-1A1A-4D66-8FA0-3D602EA367B1.png"
          menuContent="Create an experience"
          onClick={() => navigate("/experience")}
        />
        <MenuCard
          src="https://cdn.zeplin.io/5ee1133b3c75ae9aea1e8b2f/assets/516E629A-3DA0-4ACB-9823-887880C051DF.png"
          menuContent="Create a community"
          onClick={() => navigate("/community")}
        />
        <div onClick={() => toggleMenu(false)} className="menu-close-btn">
          X
        </div>
      </div>
    </>
  );
};

export default React.memo(MenuComp);
