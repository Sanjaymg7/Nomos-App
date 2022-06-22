import React from "react";
import { Navigate } from "react-router-dom";
import Image from "../../../Components/Image/Image";
import "./HomeCard.css";
import { useNavigate } from "react-router-dom";

const HomeCard = ({
  index,
  post,
  postId,
  userName,
  title,
  profilePicture,
  description,
  imageURL,
  views,
  comments,
  likes,
  isLiked,
  postViews,
  updateLikes,
  setCommentsPage,
}) => {
  const navigate = useNavigate();
  return (
    <div
      className="home-card-container"
      onClick={() => {
        postViews(postId);
        localStorage.setItem("post_id", postId);
        navigate("/userdetails");
      }}
    >
      <div className="home-card-header">
        <div className="intro-container">
          <div className="home-header-container">
            <Image
              className="profile-photo"
              src={profilePicture}
              alt="Profile img"
            />
            <div className="home-header-text">
              <h4>{userName}</h4>
              <span>{post.location.name}</span>
            </div>
          </div>
        </div>
      </div>
      <div className="home-card-body">
        <div className="body-text">
          <h4>{title}</h4>
          <div className="span-tag home-para">
            {description.length <= 80
              ? description
              : description.slice(0, 79) + "..."}
          </div>
        </div>
        <div>
          <Image className="post-img" src={imageURL} alt="img" />
        </div>
      </div>
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
            onClick={(e) => {
              e.stopPropagation();
              updateLikes(postId, post, index);
            }}
          />
          <div className="footer-text">{likes}</div>
          <Image
            className="icon"
            src="https://cdn.zeplin.io/5ee1133b3c75ae9aea1e8b2f/assets/A0438201-1D9D-4041-9FC2-71DAAF64B89F.png"
            alt="comments icon"
            onClick={(e) => {
              e.stopPropagation();
              setCommentsPage(postId);
            }}
          />
          <div className="footer-text">{comments}</div>
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
