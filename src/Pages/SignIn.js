import React, { useState } from "react";
import Button from "../Components/Button";
import Input from "../Components/Input";
import { doPOSTCall } from "../DataFetch";
import "./SignIn.css";

const SignIn = () => {
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
      const url = "https://api2.juegogames.com/NOMOS-V3/users/sign_in/";
      const body = {
          "email": userEmail,
          "password": userPass,
          "type": "2"
      };
      const queryString = new URLSearchParams(body);
      doPOSTCall(url, queryString)
      .then(data =>console.log(data))
      .catch(err => console.error(err))
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
        OnInputChange={setUserEmail}
      />
      <label>Password</label>
      <br />
      <Input
        className="input"
        type="password"
        value={userPass}
        OnInputChange={setUserPass}
      />
      <Button
        className="btn"
        btnContent="Sign In"
        onBtnClick={() => userSignIn()}
      />
    </div>
  );
};

export default SignIn;
