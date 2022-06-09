import React from "react";
import Input from "../../../Components/Input/Input";
import Button from "../../../Components/Button/Button";
import Header from "../../../Components/Header/Header";
import { putCall } from "../../../Components/Services/DataFetch";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";

const ConfirmPass = () => {
  const [cookies, setCookie, removeCookie] = useCookies();
  const navigate = useNavigate();

  const validatePassword = (password) => {
    const { newPassword, confirmPassword } = password;
    if (newPassword === confirmPassword && newPassword !== "") {
      return true;
    } else if (newPassword === "" && confirmPassword === "") {
      alert("Please Enter password");
    } else {
      alert("Password Mis match");
    }
  };
  const confirmPassword = async (e) => {
    e.preventDefault();
    const newPassword = e.target[0].value;
    const confirmPassword = e.target[1].value;
    const password = {
      newPassword,
      confirmPassword,
    };
    const isValidPassword = validatePassword(password);
    if (isValidPassword) {
      const confirmPassword = await putCall("users/reset_password", {
        new_password: newPassword,
        reset_token: cookies.access_token,
      });
      if (confirmPassword) {
        removeCookie("access_token", { path: "/" });
        navigate("/signin");
      }
    }
  };
  return (
    <>
      <Header />
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
