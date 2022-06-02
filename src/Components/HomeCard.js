import React from "react";
import "./HomeCard.css";

const HomeCard = () => {
  return (
    <div className='home-card-container'>
      <div className='home-card-header'>
          <div className='intro-container'>
              <div><img className="profile-photo" src="https://media.istockphoto.com/photos/futuristic-conceptual-photo-startup-concept-rocket-takeoff-and-from-picture-id1335358427?b=1&k=20&m=1335358427&s=170667a&w=0&h=8KCRoT4MfPUkiqGf4-8--fSXnzR1KMK3--YXWL5Dqew="alt='Profile img'/></div>
              <div>
                  <h5>jacobs</h5>
                  <span className='span-tag'>roteal</span>
              </div>
          </div>
          <span className='span-tag'>...</span>
      </div>
      <div className='home-card-body'>
          <h5>Welcome fhdksjflfds</h5>
          <span className='span-tag home-para'>dlfioewefjldflkjdsfds</span>
          <img className="post-img" src="https://media.istockphoto.com/photos/customer-satisfaction-survey-concept-businessman-using-computer-picture-id1312214761?b=1&k=20&m=1312214761&s=170667a&w=0&h=k5-8lZoIyHJGfcMAtSD0iahOD3EyDg0vOlvd4FTXsC8=" alt='img' />
      </div>
      <div className='home-date'>
              <h5>Friday</h5>
              <span className='span-tag'>23 interasted</span>
          </div>
      <div className='home-card-footer'>
          <span className='span-tag'>34</span>
          <span className='span-tag'>12</span>
      </div>

    </div>
  );
};

export default HomeCard;
