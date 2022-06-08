import React from "react";
import Button from "../../Components/Button/Button";
import Input from "../../Components/Input/Input";
import { doPOSTCall } from "../../DataFetch";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import "./SignIn.css";
import Title from "../../Components/Title/Title";

const SignIn = () => {
  const [, setCookie] = useCookies("");
  const navigate = useNavigate();

  const validateUser = (userData) => {
    const {email , password } = userData;
    if (
      email === "" ||
      !email.match("[a-zA-Z0-9]+@[a-z]+[.]+[a-z]{2,3}")
    ) {
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
      const userDetail = await doPOSTCall("users/sign_in", userData);
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
      <Title />
      <form className="signin" onSubmit={userSignIn}>
        <label className="signin-label">Email</label>
        <br />
        <Input className="input" />
        <label className="signin-label">Password</label>
        <br />
        <Input className="input" type="password" />
        <Button className="btn sign-in" btnContent="Sign In" />
        <p onClick={() => navigate("/forgotpassword")} className="forgot-para">
          Forgot password?
        </p>
      </form>
    </>
  );
};

export default React.memo(SignIn);
