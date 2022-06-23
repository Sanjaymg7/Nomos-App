import React, { useState } from "react";
import {
  PostContext,
  experiencePostInitData,
} from "../../Components/Context/Context";
import ExperiencePostInput from "./ExperiencePostInput";
import SkillAndCategoryForm from "../../Components/SkillAndCategoryForm/SkillAndCategoryForm";
import Friends from "../../Components/Friends/Friends";

const ExperiencePost = () => {
  const [experiencePostData, setExperiencePostData] = useState(
    experiencePostInitData
  );
  const [componentState, setComponentState] = useState("ExperiencePostInput");

  const renderComponent = (state) => {
    setComponentState(state);
  };

  const handleSkillOrCategorySubmit = ([, data, dataNames]) => {
    setExperiencePostData({
      ...experiencePostData,
      skills_required: data,
      skills_array: dataNames,
    });
    renderComponent("ExperiencePostInput");
  };

  const handleFriendsSubmit = (userIds, userNames) => {
    setExperiencePostData({
      ...experiencePostData,
      moderator_user_id: userIds.join(","),
      moderator_user_name: userNames,
    });
    renderComponent("ExperiencePostInput");
  };

  return (
    <div>
      <PostContext.Provider value={[experiencePostData, setExperiencePostData]}>
        {componentState === "ExperiencePostInput" && (
          <ExperiencePostInput renderComponent={renderComponent} />
        )}
        {componentState === "skills" && (
          <SkillAndCategoryForm
            component={"skills"}
            handleSkillOrCategorySubmit={handleSkillOrCategorySubmit}
          />
        )}
        {componentState === "moderator" && (
          <Friends
            handleFriendsSubmit={handleFriendsSubmit}
            selectType="single"
            userType="Moderator"
          />
        )}
      </PostContext.Provider>
    </div>
  );
};

export default ExperiencePost;
