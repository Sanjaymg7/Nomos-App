import React from "react";
import userIcons from "./UserIcons.module.css";
import Image from "../Image/Image";
const UserIcons = ({ postData, onClick }) => {
  return (
    <div className={userIcons.footer}>
      <div className={userIcons.footerIcons}>
        <div className={userIcons.footerIcon}>
          <Image
            className={userIcons.icon}
            src={
              postData.is_liked
                ? "https://cdn.zeplin.io/5ee1133b3c75ae9aea1e8b2f/assets/9C5ED4B1-EE22-468D-8168-0BFD7D3C607A.png"
                : "https://cdn.zeplin.io/5ee1133b3c75ae9aea1e8b2f/assets/C6DF2E4F-8890-4608-9274-5E4F21FB295E.png"
            }
            alt="like"
            onClick={onClick}
          />
          <p className={userIcons.footerText}>{postData.like_count}</p>
        </div>
        <div className={userIcons.footerIcon}>
          <Image
            className={userIcons.icon}
            src="https://cdn.zeplin.io/5ee1133b3c75ae9aea1e8b2f/assets/A0438201-1D9D-4041-9FC2-71DAAF64B89F.png"
            alt="comments icon"
          />
          <p className={userIcons.footerText}>{postData.comment_count}</p>
        </div>
      </div>
      <div className={userIcons.footerIcon}>
        <Image
          className={userIcons.viewIcon}
          src="https://cdn.zeplin.io/5ee1133b3c75ae9aea1e8b2f/assets/84C21AF0-580D-42C4-B0B7-EF84792A81E2.png"
          alt="seen icon"
        />
        <p className={userIcons.footerText}>{postData.views_count}</p>
      </div>
    </div>
  );
};

export default React.memo(UserIcons);
