import React, { createContext, useState } from "react";
import ExperiencePostInput from "./ExperiencePostInput";
import SkillAndCategoryForm from "../../Components/SkillAndCategoryForm/SkillAndCategoryForm";
import Friends from "../../Components/Friends/Friends";

export const ExperiencePostContext = createContext();

const ExperiencePost = () => {
  const initState = {
    experience_name: "",
    experience_desc: "",
    experience_image: "",
    community_id: "",
    skills_required: "",
    skills_array: [],
    start_time: "",
    location:
      '{"lat":12.9141417,"lng":74.8559568,"name":"Mangalore,Karnataka,India"}',
    image_url: "",
    required_hours: "",
    moderator_user_id: "",
    moderator_user_name: [],
    max_participants: 10,
  };

  const [experiencePostData, setExperiencePostData] = useState(initState);
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
      <ExperiencePostContext.Provider
        value={[experiencePostData, setExperiencePostData]}
      >
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
      </ExperiencePostContext.Provider>
    </div>
  );
};

export default ExperiencePost;
