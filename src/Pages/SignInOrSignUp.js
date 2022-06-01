import React from "react";
import { useNavigate } from "react-router-dom";
import Button from "../Components/Button";
import "./SignInOrSignUp.css";
const SignInOrSignUp = () => {
  const navigate = useNavigate();
  return (
    <div className="container">
      <p>
        Experience your community <br /> and earn time
      </p>
      <Button className="btn" btnContent="Sign In" onBtnClick={() => navigate("/signin")} />
      <Button className="btn" btnContent="Sign Up" onBtnClick={() => navigate("/signup")} />
    </div>
  );
};

export default SignInOrSignUp;
