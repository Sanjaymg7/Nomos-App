import React from "react";
import Image from "../../../Components/Image/Image";
import "./HomeCard.css";
import { useNavigate } from "react-router-dom";
import { userDefaultImage, userDetails } from "../../../Library/Constants";
import UserIcons from "../../../Components/UserIcons/UserIcons";

const HomeCard = ({ index, post, postViews, updateLikes }) => {
  const navigate = useNavigate();
  const {
    post_id,
    user_name,
    title,
    profile_picture_url,
    description,
    image_url,
    location,
  } = post;
  return (
    <div
      className="home-card-container"
      onClick={() => {
        postViews(post_id);
        localStorage.setItem("post_id", post_id);
        navigate(userDetails);
      }}
    >
      <div className="home-card-header">
        <div className="home-card-intro-container">
          <div className="home-header-container">
            <Image
              className="profile-photo"
              src={profile_picture_url || userDefaultImage}
              alt="Profile img"
            />
            <div className="home-header-text">
              <h4>{user_name}</h4>
              <span>{location.name}</span>
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
          <Image className="post-img" src={image_url} alt="img" />
        </div>
      </div>
      <UserIcons
        postData={post}
        onClick={(e) => {
          e.stopPropagation();
          updateLikes(post_id, post, index);
        }}
      />
    </div>
  );
};

export default React.memo(HomeCard);
