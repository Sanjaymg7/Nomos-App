import React from "react";
import Input from "../../Components/Input/Input";
import Button from "../../Components/Button/Button";
import Header from "../../Components/Header/Header";
import { putCall } from "../../DataFetch";
// import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import { BrowserRouter } from "react-router-dom";

const ConfirmPass = ({ setComp }) => {
  const [cookies, setCookie, removeCookie] = useCookies();
  //   const navigate = useNavigate();
  const confirmPassword = async (e) => {
    e.preventDefault();
    const newPassword = e.target[0].value;
    const confirmPassword = e.target[1].value;
    if (newPassword === confirmPassword && newPassword !== "") {
      const confirmPassword = await putCall("users/reset_password", {
        new_password: newPassword,
        reset_token: cookies.access_token,
      });
      if (confirmPassword) {
        // cookies.remove('token', { path: '/' });
        removeCookie("access_token", { path: "/" });
        console.log(cookies.access_token);
        setComp(0);
      }
    } else if (newPassword === "" && confirmPassword === "") {
      alert("Please Enter password");
    } else {
      alert("Password Mis match");
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
