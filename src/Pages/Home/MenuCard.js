import React from "react";
import "./MenuCard.css";

const MenuCard = ({ src, menuContent, onClick }) => {
  return (
    <div onClick={onClick} className="menu-item">
      <img className="menu-image" src={src} alt="image" />
      <span>{menuContent}</span>
    </div>
  );
};

export default MenuCard;
