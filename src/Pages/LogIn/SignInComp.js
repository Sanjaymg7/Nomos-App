import React from "react";
import Button from "../../Components/Button/Button";
import Input from "../../Components/Input/Input";
import { postCall } from "../../DataFetch";
import { useNavigate } from "react-router-dom";
import "./SignInComp.css";
import Header from "../../Components/Header/Header";

const SignInComp = ({ setCookie, changeComp }) => {
  const navigate = useNavigate();
  const userSignIn = async (e) => {
    e.preventDefault();
    const userEmail = e.target[0].value;
    const userPass = e.target[1].value;
    e.target[2].innerHTML = "Please wait...";
    if (
      userEmail === "" ||
      !userEmail.match("[a-zA-Z0-9]+@[a-z]+[.]+[a-z]{2,3}")
    ) {
      alert("Please enter valid User Email");
    } else if (userPass.length < 6) {
      alert("Password should be above 6 characters");
    } else {
      const body = {
        email: userEmail,
        password: userPass,
        type: "2",
      };
      const userDetail = await postCall("users/sign_in", body);
      if (userDetail) {
        setCookie("access_token", userDetail.access_token, {
          path: "/",
        });
        navigate("/home?type=3");
        e.target[2].innerHTML = "Sign In";
      }
    }
  };
  const forgotPassword = (e) => {
    e.preventDefault();
    changeComp(1);
  };
  return (
    <>
      <Header />
      <form className="signin" onSubmit={userSignIn}>
        <label className="signin-label">Email</label>
        <br />
        <Input className="input" />
        <label className="signin-label">Password</label>
        <br />
        <Input className="input" type="password" />
        <Button className="btn sign-in" btnContent="Sign In" />
        <p onClick={forgotPassword} className="forgot-para">
          Forgot password?
        </p>
      </form>
    </>
  );
};

export default React.memo(SignInComp);
