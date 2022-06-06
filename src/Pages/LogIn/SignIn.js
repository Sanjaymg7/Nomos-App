import React, { useState } from "react";
import ChangePassword from "./ChangePassword";
import ConfirmPass from "./ConfirmPass";
import SignInComp from "./SignInComp";
import { useNavigate } from "react-router-dom";
import "./SignIn.css";
import { useCookies } from "react-cookie";

const SignIn = () => {
  const navigate = useNavigate();
  const [cookies, setCookie] = useCookies("");
  const [comp, setComp] = useState(0);
  return (
    <>
      {/* {document.cookie.access_token!=="" && navigate("/home")} */}
      {comp === 0 && <SignInComp setCookie={setCookie} changeComp={setComp} />}
      {comp === 1 && <ChangePassword setCookie={setCookie} changeComp={setComp} />}
      {comp === 2 && <ConfirmPass />}
    </>
  );
};

export default React.memo(SignIn);
