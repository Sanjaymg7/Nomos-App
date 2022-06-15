import React from "react";
import "./UserDisplay.css";

const UserDisplay = ({ renderComponent, namesArray, userType }) => {
  return (
    <div>
      <div className="userDisplayContainer">
        <div className="userDisplayInput">
          <h3 className="userDisplayTitle">{userType}</h3>
          <div className="userDisplay">
            {namesArray.length <= 4
              ? namesArray.join(",")
              : namesArray.slice(0, 4).join(",") +
                "..." +
                ` +${+namesArray.length - 4} others`}
          </div>
        </div>
        <div
          className="selectuserDisplay"
          onClick={() => renderComponent(`${userType.toLowerCase()}`)}
        >
          {">"}
        </div>
      </div>
    </div>
  );
};

export default React.memo(UserDisplay);
