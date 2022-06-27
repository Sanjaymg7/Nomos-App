import React from "react";
import { accept, reject, userDefaultImage } from "../../Library/Constants";
import Button from "../Button/Button";
import Image from "../Image/Image";
import "./Request.css";

const Request = ({
  profilePicture,
  userName,
  response,
  id,
  index,
  acceptHandler,
  rejectHandler,
}) => {
  return (
    <div>
      <div key={index} className="friendRequestWrapper">
        <Image
          src={profilePicture || userDefaultImage}
          className="requestUserProfilePicture"
        />
        <h4 className="requestUserName">{userName}</h4>
        {!response && (
          <div className="requestButtonWrapper">
            <Button
              btnName={accept}
              className="requestAcceptBtn"
              onBtnClick={() => acceptHandler(id, index)}
            />
            <Button
              btnName={reject}
              className="requestRejectBtn"
              onBtnClick={() => rejectHandler(id, index)}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default React.memo(Request);
