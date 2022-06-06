import React, { useState } from "react";
import ChangePassword from "./ChangePassword";
import ConfirmPass from "./ConfirmPass";
import SignInComp from "./SignInComp";
import "./SignIn.css"

const SignIn = () => {
  const [comp, setComp] = useState(0);
  return (
    <>
      {comp === 0 && <SignInComp changeComp={setComp} />}
      {comp === 1 && <ChangePassword changeComp={setComp} />}
      {comp === 2 && <ConfirmPass />}
    </>
  );
};

export default React.memo(SignIn);
