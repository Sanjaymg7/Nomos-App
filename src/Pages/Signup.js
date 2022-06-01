import React, { useState } from "react";
import SignupComp1 from "../Components/SignupComp1";
import SignupComp2 from "../Components/SignupComp2";
import SignupComp3 from "../Components/SignupComp3";
import SignupComp4 from "../Components/SignupComp4";

const Signup = () => {
  const initUserState = {
    fullName: "",
    phone: "",
    email: "",
    password: "",
    skills: [],
    community: [],
  };
  const [pageState, setPageState] = useState(1);
  const [userDetails, setUserDetails] = useState(initUserState);

  const handleNameChange = (val) => {
    setUserDetails((prevState) => {
      return { ...prevState, fullName: val };
    });
  };

  const handlePhoneChange = (val) => {
    setUserDetails((prevState) => {
      return { ...prevState, phone: val };
    });
  };

  const handleEmailChange = (val) => {
    setUserDetails((prevState) => {
      return { ...prevState, email: val };
    });
  };

  const handlePasswordChange = (val) => {
    setUserDetails((prevState) => {
      return { ...prevState, password: val };
    });
  };

  const handleSubmit = (val) => {
    setPageState(val);
  };

  const signupComp1Data = {
    onNameChange: handleNameChange,
    onPhoneChange: handlePhoneChange,
    onEmailChange: handleEmailChange,
    onPasswordChange: handlePasswordChange,
    compSubmit: handleSubmit,
  };

  return (
    <div>
      {pageState === 1 ? (
        <SignupComp1
          comp1Data={signupComp1Data}
          nameVal={userDetails.fullName}
          phoneVal={userDetails.phone}
          emailVal={userDetails.email}
          passwordVal={userDetails.password}
        />
      ) : pageState === 2 ? (
        <SignupComp2 compSubmit={handleSubmit} />
      ) : pageState === 3 ? (
        <SignupComp3 compSubmit={handleSubmit} />
      ) : (
        <SignupComp4 compSubmit={handleSubmit} />
      )}
      {/* <SignupComp1
        comp1Data={signupComp1Data}
        nameVal={userDetails.fullName}
        phoneVal={userDetails.phone}
        emailVal={userDetails.email}
        passwordVal={userDetails.password}
      /> */}
      {/* <SignupComp2 compSubmit={handleSubmit} /> */}
      {/* <SignupComp3 compSubmit={handleSubmit} /> */}
      {/* <SignupComp4 compSubmit={handleSubmit} /> */}
    </div>
  );
};

export default Signup;
