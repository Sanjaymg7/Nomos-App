import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  home,
  signIn,
  signUp,
  signInName,
  signUpName,
} from "../../../Library/Constants";
import Button from "../../../Components/Button/Button";
import Image from "../../../Components/Image/Image";
import "./Intro.css";

const Intro = () => {
  const navigate = useNavigate();
  useEffect(() => {
    if (localStorage.getItem("access_token")) {
      navigate(home);
    }
  });
  return (
    <div className="container">
      <Image
        className="intro-image"
        src="https://cdn.zeplin.io/5ee1133b3c75ae9aea1e8b2f/assets/308ABF11-62C2-4B19-A4A0-74586E36528A.png"
        alt="intro-image"
      />
      <Image
        className="intro-title"
        src="https://cdn.zeplin.io/5ee1133b3c75ae9aea1e8b2f/assets/B72D89C2-B3C0-452D-853C-6BA14C2624B3.png"
        alt="intro-title"
      />
      <p>
        Experience your community <br /> and earn time
      </p>
      <Button
        className="btn"
        btnName={signInName}
        onBtnClick={() => navigate(signIn)}
      />
      <Button
        className="btn"
        btnName={signUpName}
        onBtnClick={() => navigate(signUp)}
      />
    </div>
  );
};

export default Intro;
