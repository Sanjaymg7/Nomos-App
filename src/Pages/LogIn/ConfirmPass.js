import React from "react";
import Input from "../../Components/Input";
import Button from "../../Components/Button";
import Title from "../../Components/Title";
import { doPUTCall } from "../../DataFetch";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";

const ConfirmPass = () => {
    const [cookies, setCookie] = useCookies();
  const navigate = useNavigate();
  const confirmPassword = async (e) => {
    e.preventDefault();
    const newPassword = e.target[0].value;
    const confirmPassword = e.target[1].value;
    if (newPassword === confirmPassword && newPassword != "") {
      const confirmPassword = await doPUTCall("users/reset_password", {
        new_password: newPassword,
        reset_token: cookies.access_token,
      });
      if (confirmPassword) {
        document.location.reload();
      }
    } else if (newPassword === "" && confirmPassword === "") {
      alert("Please Enter password");
    } else {
      alert("Password Mis match");
    }
  };
  return (
    <>
      <Title />
      <form className="signin" onSubmit={confirmPassword}>
        <label>Enter New Password</label>
        <br />
        <Input className="input" type="password" />
        <label>Confirm New Password</label>
        <br />
        <Input className="input" type="password" />
        <Button className="btn sign-in" btnContent="Reset Password" />
      </form>
    </>
  );
};

export default React.memo(ConfirmPass);
