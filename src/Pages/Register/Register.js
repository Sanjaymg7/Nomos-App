import React, { useState } from "react";
import UserDataComponent from "./UserDataComponent";
import OTPComponent from "./OTPComponent";
import SkillsComponent from "./SkillsComponent";
import CommunityComponent from "./CommunityComponent";

const Register = () => {
  const [userData, setUserData] = useState({
    user_id: "",
  });
  const [pageState, setPageState] = useState("userDataComponent");

  const handleSubmit = (val) => {
    setPageState(val);
  };

  const updateUserId = (id) => {
    setUserData({ ...userData, user_id: id });
  };

  return (
    <div>
      {pageState === "userDataComponent" ? (
        <UserDataComponent
          renderSignupComponent={handleSubmit}
          updateId={updateUserId}
        />
      ) : pageState === "otpComponent" ? (
        <OTPComponent
          renderSignupComponent={handleSubmit}
          userId={userData.user_id}
        />
      ) : pageState === "skillsComponent" ? (
        <SkillsComponent renderComponent={handleSubmit} />
      ) : (
        <CommunityComponent />
      )}
    </div>
  );
};

export default React.memo(Register);
