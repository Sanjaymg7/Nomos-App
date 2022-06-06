import React, { useState } from "react";
import UserDataComponent from "./UserDataComponent";
import OTPComponent from "./OTPComponent";
import SkillsComponent from "./SkillsComponent";
import CommunityComponent from "./CommunityComponent";

const Register = () => {
  const [userData, setUserData] = useState({
    user_id: "",
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
        <UserDataComponent
          renderSignupComponent={handleSubmit}
          updateId={updateUserId}
        />
      ) : pageState === 2 ? (
        <OTPComponent
          renderSignupComponent={handleSubmit}
          userId={userData.user_id}
        />
      ) : pageState === 3 ? (
        <SkillsComponent renderComponent={handleSubmit} />
      ) : (
        <CommunityComponent />
      )}
    </div>
  );
};

export default React.memo(Register);
