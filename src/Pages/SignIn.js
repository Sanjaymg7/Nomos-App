import React, { useState } from "react";
import Button from "../Components/Button";
import Input from "../Components/Input";
import { doPOSTCall } from "../DataFetch";
import "./SignIn.css";
import { useNavigate } from "react-router-dom";

const SignIn = () => {
  const navigate = useNavigate();
  const [userEmail, setUserEmail] = useState("");
  const [userPass, setUserPass] = useState("");
  const userSignIn = () => {
    console.log(userEmail.match("[a-zA-Z0-9]+@[a-z]+[.]+[a-z]{2,3}"));
    if (
      userEmail === "" ||
      !userEmail.match("[a-zA-Z0-9]+@[a-z]+[.]+[a-z]{2,3}")
    ) {
      alert("Please enter valid User Email");
    } else if (userPass.length < 6) {
      alert("Password should be above 6 characters");
    } else {
    //   const url = "https://api2.juegogames.com/NOMOS-V3/users/sign_in/";
      const body = {
        email: userEmail,
        password: userPass,
        type: "2",
      };
      doPOSTCall("users/sign_in",body)
        .then((data) => {
          if (data.responseCode === 200) {
            navigate("/home");
          }
        })
        .catch((err) => console.error(err));
    }
  };

  return (
    <div className="signin">
      <label>Email</label>
      <br />
      <Input
        className="input"
        type="email"
        value={userEmail}
        onInputChange={setUserEmail}
      />
      <label>Password</label>
      <br />
      <Input
        className="input"
        type="password"
        value={userPass}
        onInputChange={setUserPass}
      />
      <Button
        className="btn sign-in"
        btnContent="Sign In"
        onBtnClick={() => userSignIn()}
      />
      <p className="forgot-para">Forgot password?</p>
    </div>
  );
};

export default SignIn;
