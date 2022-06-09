import React from "react";
import Button from "../../Components/Button/Button";
import Input from "../../Components/Input/Input";
import { postCall } from "../../Components/Services/DataFetch";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import "./SignIn.css";
import Header from "../../Components/Header/Header";
import Label from "../../Components/Label";

const SignIn = () => {
  const [, setCookie] = useCookies("");
  const navigate = useNavigate();

  const validateUser = (userData) => {
    const { email, password } = userData;
    if (email === "" || !email.match("[a-zA-Z0-9]+@[a-z]+[.]+[a-z]{2,3}")) {
      alert("Please enter valid User Email");
    } else if (password.length < 6) {
      alert("Password should be above 6 characters");
    } else {
      return true;
    }
  };
  const userSignIn = async (e) => {
    e.preventDefault();
    const email = e.target[0].value;
    const password = e.target[1].value;
    const userData = {
      email,
      password,
      type: 2,
    };
    const isValidUser = validateUser(userData);
    if (isValidUser) {
      const userDetail = await postCall("users/sign_in", userData);
      if (userDetail) {
        setCookie("access_token", userDetail.access_token, {
          path: "/",
        });
        navigate("/home");
      }
    }
  };
  return (
    <>
      <Header />
      <form className="signin" onSubmit={userSignIn}>
        <Label className="signin-label" labelContent="Email" />
        <br />
        <Input className="input" />
        <Label className="signin-label" labelContent="Password" />
        <br />
        <Input className="input" type="password" />
        <Button className="btn sign-in" btnContent="Sign In" />
      </form>
      <p onClick={() => navigate("/forgotpassword")} className="forgot-para">
        Forgot password?
      </p>
    </>
  );
};

export default React.memo(SignIn);
