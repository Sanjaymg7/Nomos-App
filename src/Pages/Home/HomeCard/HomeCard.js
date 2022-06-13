import React, { useState } from "react";
import Image from "../../../Components/Image/Image";
import "./HomeCard.css";

const HomeCard = ({
  postId,
  userName,
  title,
  profilePicture,
  description,
  imageURL,
  interested,
  views,
  comments,
  likes,
  isLiked,
  updateLikes,
}) => {
  return (
    <div className="home-card-container">
      <div className="home-card-header">
        <div className="intro-container">
          <div className="home-header-container">
            <Image
              className="profile-photo"
              src={profilePicture}
              alt="Profile img"
            />
            <div className="home-header-text">
              <h5>{userName}</h5>
              <div className="">{title}</div>
            </div>
          </div>
          <div className="three-dots">...</div>
        </div>
      </div>
      <div className="home-card-body">
        <div className="body-text">
          <h5>Welcome fhdksjflfds</h5>
          <div className="span-tag home-para">{description}</div>
        </div>
        <div>
          <Image className="post-img" src="" alt="img" />
        </div>
      </div>
      <div className="home-date">{interested} interested</div>
      <div className="home-card-footer">
        <div className="footer-icons">
          <Image
            className="icon"
            src={
              isLiked
                ? "https://cdn.zeplin.io/5ee1133b3c75ae9aea1e8b2f/assets/9C5ED4B1-EE22-468D-8168-0BFD7D3C607A.png"
                : "https://cdn.zeplin.io/5ee1133b3c75ae9aea1e8b2f/assets/C6DF2E4F-8890-4608-9274-5E4F21FB295E.png"
            }
            alt="like"
            onClick={() => updateLikes(postId)}
          />
          <div className="footer-text">{likes}</div>
          <Image
            className="icon"
            src="https://cdn.zeplin.io/5ee1133b3c75ae9aea1e8b2f/assets/A0438201-1D9D-4041-9FC2-71DAAF64B89F.png"
            alt="comments icon"
          />
          <div className="footer-text">{comments}</div>
          <Image
            className="icon"
            src="https://cdn.zeplin.io/5ee1133b3c75ae9aea1e8b2f/assets/E139024C-F8BF-4722-A3C2-2DD2136B26C4.png"
            alt="share"
          />
        </div>
        <div className="view-icon">
          <Image
            className="icon"
            src="https://cdn.zeplin.io/5ee1133b3c75ae9aea1e8b2f/assets/84C21AF0-580D-42C4-B0B7-EF84792A81E2.png"
            alt="seen icon"
          />
          <div className="footer-text">{views}</div>
        </div>
      </div>
    </div>
  );
};

export default React.memo(HomeCard);
