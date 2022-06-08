import React, { useState } from "react";
import ChangePassword from "./ChangePassword";
import ConfirmPass from "./ConfirmPass";
import SignInComp from "./SignInComp";
import "./SignIn.css";
import { useCookies } from "react-cookie";

const SignIn = () => {
  const [cookies, setCookie] = useCookies("");
  const [comp, setComp] = useState(0);

  return (
    <>
      {comp === 0 && <SignInComp setCookie={setCookie} changeComp={setComp} />}
      {comp === 1 && <ChangePassword setCookie={setCookie} changeComp={setComp} />}
      {comp === 2 && <ConfirmPass setComp={setComp} />}
    </>
  );
};

export default React.memo(SignIn);
