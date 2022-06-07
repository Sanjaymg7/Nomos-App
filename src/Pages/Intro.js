import React from "react";
import { useNavigate } from "react-router-dom";
import Button from "../Components/Button";
import { useCookies } from "react-cookie";
import "./Intro.css";
const Intro = () => {
  const [cookies, setCookie] = useCookies();
  const navigate = useNavigate();
  // const hasAccessToken = () => {
  //   if (cookies.access_token !== "") {
  //     navigate("/home");
  //   }
  // };
  // hasAccessToken();
  return (
    <div className="container">
      <p>
        Experience your community <br /> and earn time
      </p>
      <Button
        className="btn"
        btnContent="Sign In"
        onBtnClick={() => navigate("/signin")}
      />
      <Button
        className="btn"
        btnContent="Sign Up"
        onBtnClick={() => navigate("/signup")}
      />
    </div>
  );
};

export default Intro;
