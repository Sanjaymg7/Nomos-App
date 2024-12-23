import React from "react";
import { userDefaultImage } from "../../../Library/Constants";
import Image from "../../../Components/Image/Image";
import "./CommentCard.css";

const CommentCard = ({ commentItem }) => {
  const { profile_picture_url, user_name, comment, commented_at } = commentItem;

  var periods = {
    year: 12 * 30 * 24 * 60 * 60 * 1000,
    month: 30 * 24 * 60 * 60 * 1000,
    week: 7 * 24 * 60 * 60 * 1000,
    day: 24 * 60 * 60 * 1000,
    hour: 60 * 60 * 1000,
    minute: 60 * 1000,
  };

  const formatTime = (commentedAt) => {
    var diff = Date.now() - commentedAt;
    if (diff > periods.year) {
      return Math.floor(diff / periods.year) + "y";
    } else if (diff > periods.month) {
      return Math.floor(diff / periods.month) + "m";
    } else if (diff > periods.week) {
      return Math.floor(diff / periods.week) + "w";
    } else if (diff > periods.day) {
      return Math.floor(diff / periods.day) + "d";
    } else if (diff > periods.hour) {
      return Math.floor(diff / periods.hour) + "h";
    } else if (diff > periods.minute) {
      return Math.floor(diff / periods.minute) + "m";
    }
    return "Just now";
  };
  return (
    <div className="comment-card">
      <div className="comment-card-profile">
        <Image
          className="comment-card-image"
          src={profile_picture_url || userDefaultImage}
          alt="Profile"
        />
        <div className="comment-card-text">
          <h4>{user_name}</h4>
          <span className="comment-card-text">{comment}</span>
          <span className="comment-card-time">
            {formatTime(commented_at)}{" "}
            {formatTime(commented_at) === "Just now" ? "" : "ago"}
          </span>
        </div>
      </div>
      <Image
        className="comment-card-comment-image"
        src="https://cdn.zeplin.io/5ee1133b3c75ae9aea1e8b2f/assets/A0438201-1D9D-4041-9FC2-71DAAF64B89F.png"
        alt="Comment Icon"
      />
    </div>
  );
};

export default React.memo(CommentCard);
