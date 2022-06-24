import React from "react";
import Image from "../../../Components/Image/Image";
import "./HomeCard.css";
import { useNavigate } from "react-router-dom";
import { userDetails } from "../../../Library/Constants";
import UserIcons from "../../../Components/UserIcons/UserIcons";

const HomeCard = ({
  index,
  post,
  postId,
  userName,
  title,
  profilePicture,
  description,
  imageURL,
  postViews,
  updateLikes,
}) => {
  const navigate = useNavigate();
  return (
    <div
      className="home-card-container"
      onClick={() => {
        postViews(postId);
        localStorage.setItem("post_id", postId);
        navigate(userDetails);
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
      <UserIcons
        postData={post}
        onClick={(e) => {
          e.stopPropagation();
          updateLikes(postId, post, index);
        }}
      />
    </div>
  );
};

export default React.memo(HomeCard);
