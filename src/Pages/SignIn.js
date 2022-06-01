import React, { useState } from "react";
import Button from "../Components/Button";
import Input from "../Components/Input";
import "./SignIn.css";

const SignIn = () => {
  const [userEmail, setUserEmail] = useState("");
  const [userPass, setUserPass] = useState("");
  const userSignIn = () => {
      document.write("lelsfkdd");
  };

  return (
    <div className="signin">
      <form>
        <label>Email</label>
        <br />
        <Input type="email" value={userEmail} OnInputChange={setUserEmail} />
        <label>Password</label>
        <br />
        <Input type="password" value={userPass} OnInputChange={setUserPass} />
        <Button
          className="signInButton"
          btnContent="Sign In"
          onBtnClick={() => userSignIn()}
        />
      </form>
    </div>
  );
};

export default SignIn;
