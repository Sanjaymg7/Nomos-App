import React, { createContext, useState } from "react";
import ExperiencePostInput from "./ExperiencePostInput/ExperiencePostInput";
import SkillAndCategoryForm from "../../Components/SkillAndCategoryForm/SkillAndCategoryForm";

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
    max_participants: "",
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
      </ExperiencePostContext.Provider>
    </div>
  );
};

export default ExperiencePost;
