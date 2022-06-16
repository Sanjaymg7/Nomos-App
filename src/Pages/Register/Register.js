import React, { useState } from "react";
import UserDataComponent from "./UserDataComponent/UserDataComponent";
import OTPComponent from "./OTPComponent/OTPComponent";
import SkillsComponent from "./SkillsComponent/SkillsComponent";
import CommunityComponent from "./CommunityComponent/CommunityComponent";

const Register = () => {
  const [userData, setUserData] = useState({
    user_id: "",
    phone_number: "",
  });
  const [pageState, setPageState] = useState("userDataComponent");

  const handleSubmit = (val) => {
    setPageState(val);
  };

  const updateUserData = (id, phone) => {
    setUserData({ user_id: id, phone_number: phone });
  };

  return (
    <div>
      {pageState === "userDataComponent" && (
        <UserDataComponent
          renderSignupComponent={handleSubmit}
          updateData={updateUserData}
        />
      )}
      {pageState === "otpComponent" && (
        <OTPComponent
          renderSignupComponent={handleSubmit}
          userId={userData.user_id}
          phoneNumber={userData.phone_number}
        />
      )}
      {pageState === "skillsComponent" && (
        <SkillsComponent renderComponent={handleSubmit} />
      )}
      {pageState === "CommunityComponent" && <CommunityComponent />}
    </div>
  );
};

export default Register;
