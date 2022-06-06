import React from "react";
import "./HomeCard.css";

const HomeCard = () => {
  
  return (
    <div className="home-card-container">
      <div className="home-card-header">
        <div className="intro-container">
          <img
            className="profile-photo"
            src="https://media.istockphoto.com/photos/futuristic-conceptual-photo-startup-concept-rocket-takeoff-and-from-picture-id1335358427?b=1&k=20&m=1335358427&s=170667a&w=0&h=8KCRoT4MfPUkiqGf4-8--fSXnzR1KMK3--YXWL5Dqew="
            alt="Profile img"
          />
          <div className="home-header-container">
            <div className="home-header-text">
              <h5>jacobs Happy Life</h5>
              <span className="">roteal jacobs</span>
            </div>
            <span className="three-dots">...</span>
          </div>
        </div>
      </div>
      <div className="home-card-body">
        <div className="body-text">
          <h5>Welcome fhdksjflfds</h5>
          <span className="span-tag home-para">
            dlfioewefjldflkjdsfds Happy Lifejacobs Happy Lifejacobs Happy
            Life...
          </span>
        </div>
        <div>
          <img
            className="post-img"
            src="https://media.istockphoto.com/photos/customer-satisfaction-survey-concept-businessman-using-computer-picture-id1312214761?b=1&k=20&m=1312214761&s=170667a&w=0&h=k5-8lZoIyHJGfcMAtSD0iahOD3EyDg0vOlvd4FTXsC8="
            alt="img"
          />
        </div>
      </div>
      <div className="home-date">
        <span className="date-month">Friday</span>
        <span className="interested">23 interasted</span>
      </div>
      <div className="home-card-footer">
      <div className="footer-icons">
      <img className="icon"
          src="https://cdn.zeplin.io/5ee1133b3c75ae9aea1e8b2f/assets/C6DF2E4F-8890-4608-9274-5E4F21FB295E.png"
          alt="like"
        />
        <span className="footer-text">34</span>
        <img className="icon"
          src="https://cdn.zeplin.io/5ee1133b3c75ae9aea1e8b2f/assets/A0438201-1D9D-4041-9FC2-71DAAF64B89F.png"
          alt="comments icon"
        />
        <span className="footer-text">12</span>
        <img className="icon"
          src="https://cdn.zeplin.io/5ee1133b3c75ae9aea1e8b2f/assets/E139024C-F8BF-4722-A3C2-2DD2136B26C4.png"
          alt="share"
        />
      </div>
      <div className="seen-icon">
      <img className="icon" src="https://cdn.zeplin.io/5ee1133b3c75ae9aea1e8b2f/assets/84C21AF0-580D-42C4-B0B7-EF84792A81E2.png" alt="seen icon"/>
      <span className="footer-text">12</span>

      </div>
        
      </div>
    </div>
  );
};

export default HomeCard;
