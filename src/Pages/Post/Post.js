import React, { useState } from "react";
import SkillsAndCategoryComponent from "./SkillsAndCategoryComponent";
import ServicePost from "./ServicePost";

const Post = () => {
  const [componentState, setComponentState] = useState(1);
  const [skills, setSkills] = useState([]);
  const [categories, setCategories] = useState([]);

  const renderComponent = (state) => {
    setComponentState(state);
  };

  const handleSkills = (skillArray) => {
    setSkills(skillArray);
    renderComponent(1);
  };

  const handleCategories = (categoryArray) => {
    setCategories(categoryArray);
    renderComponent(1);
  };
  return (
    <div>
      {componentState === 1 ? (
        <ServicePost
          renderComponent={renderComponent}
          skills={skills}
          categories={categories}
        />
      ) : componentState === 2 ? (
        <SkillsAndCategoryComponent
          handleData={handleSkills}
          component={"skills"}
        />
      ) : (
        <SkillsAndCategoryComponent
          handleData={handleCategories}
          component={"category"}
        />
      )}
    </div>
  );
};

export default React.memo(Post);
