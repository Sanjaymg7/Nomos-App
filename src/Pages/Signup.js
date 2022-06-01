import React, { useState } from "react";
import SignupComp1 from "../Components/SignupComp1";
import SignupComp2 from "../Components/SignupComp2";
import SignupComp3 from "../Components/SignupComp3";
import SignupComp4 from "../Components/SignupComp4";

const Signup = () => {
  const [userData, setUserData] = useState({
    user_id: "",
    access_token: "",
  });
  const [pageState, setPageState] = useState(1);

  const handleSubmit = (val) => {
    setPageState(val);
  };

  const updateUserId = (id) => {
    setUserData((prevState) => {
      return { ...prevState, user_id: id };
    });
  };

  return (
    <div>
      {pageState === 1 ? (
        <SignupComp1 compSubmit={handleSubmit} updateId={updateUserId} />
      ) : pageState === 2 ? (
        <SignupComp2 compSubmit={handleSubmit} />
      ) : pageState === 3 ? (
        <SignupComp3 compSubmit={handleSubmit} />
      ) : (
        <SignupComp4 compSubmit={handleSubmit} />
      )}
    </div>
  );
};

export default Signup;
