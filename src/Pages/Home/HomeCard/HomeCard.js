import React from "react";
import Image from "../../../Components/Image/Image";
import "./HomeCard.css";

const HomeCard = ({
  userName,
  title,
  profilePicture,
  description,
  imageURL,
  interested,
  views,
  comments,
  likes,
}) => {
  return (
    <div className="home-card-container">
      <div className="home-card-header">
        <div className="intro-container">
          <Image className="profile-photo" src={profilePicture} alt="Profile img" />
          <div className="home-header-container">
            <div className="home-header-text">
              <h5>{userName}</h5>
              <span className="">{title}</span>
            </div>
            <span className="three-dots">...</span>
          </div>
        </div>
      </div>
      <div className="home-card-body">
        <div className="body-text">
          <h5>Welcome fhdksjflfds</h5>
          <span className="span-tag home-para">{description}</span>
        </div>
        <div>
          <Image className="post-img" src="" alt="img" />
        </div>
      </div>
        <span className="home-date">{interested} interested</span>
      <div className="home-card-footer">
        <div className="footer-icons">
          <img
            className="icon"
            src="https://cdn.zeplin.io/5ee1133b3c75ae9aea1e8b2f/assets/C6DF2E4F-8890-4608-9274-5E4F21FB295E.png"
            alt="like"
          />
          <span className="footer-text">{likes}</span>
          <img
            className="icon"
            src="https://cdn.zeplin.io/5ee1133b3c75ae9aea1e8b2f/assets/A0438201-1D9D-4041-9FC2-71DAAF64B89F.png"
            alt="comments icon"
          />
          <span className="footer-text">{comments}</span>
          <img
            className="icon"
            src="https://cdn.zeplin.io/5ee1133b3c75ae9aea1e8b2f/assets/E139024C-F8BF-4722-A3C2-2DD2136B26C4.png"
            alt="share"
          />
        </div>
        <div className="view-icon">
          <img
            className="icon"
            src="https://cdn.zeplin.io/5ee1133b3c75ae9aea1e8b2f/assets/84C21AF0-580D-42C4-B0B7-EF84792A81E2.png"
            alt="seen icon"
          />
          <span className="footer-text">{views}</span>
        </div>
      </div>
    </div>
  );
};

export default HomeCard;
