import React from "react";
import "./People.css";
import Image from "../Image/Image";
import { userDefaultImage } from "../../Library/Constants";

const People = ({ name, profilePicture, status }) => {
  return (
    <div className="people-container">
      <div className="people-image-name">
        <Image
          className="people-image"
          src={profilePicture || userDefaultImage}
        />
        <div className="people-name-status">
          <h5 className="people-name">{name}</h5>
          <p className="people-status">
            {status == 1 ? "Pending" : status == 2 && "Joined"}
          </p>
        </div>
      </div>
      <div className="people-symbol">{">"}</div>
    </div>
  );
};

export default People;
