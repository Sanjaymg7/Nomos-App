import React, { useState } from "react";
import {
  PostContext,
  servicePostInitData,
} from "../../Components/Context/Context";
import ServicePostInput from "./ServicePost/ServicePostInput";
import SkillAndCategoryForm from "../../Components/SkillAndCategoryForm/SkillAndCategoryForm";

const Post = () => {
  const [postData, setPostData] = useState(servicePostInitData);
  const [componentState, setComponentState] = useState("postData");

  const renderComponent = (state) => {
    setComponentState(state);
  };

  const handleSkillOrCategorySubmit = ([type, data, dataNames]) => {
    if (type === "skills") {
      setPostData({
        ...postData,
        skills_required: data,
        skills_array: dataNames,
      });
    } else {
      setPostData({
        ...postData,
        category_required: data,
        categories_array: dataNames,
      });
    }
    renderComponent("postData");
  };

  return (
    <div>
      <PostContext.Provider value={[postData, setPostData]}>
        {componentState === "postData" && (
          <ServicePostInput renderComponent={renderComponent} />
        )}
        {componentState === "skills" && (
          <SkillAndCategoryForm
            component={"skills"}
            handleSkillOrCategorySubmit={handleSkillOrCategorySubmit}
          />
        )}
        {componentState === "category" && (
          <SkillAndCategoryForm
            component={"category"}
            handleSkillOrCategorySubmit={handleSkillOrCategorySubmit}
          />
        )}
      </PostContext.Provider>
    </div>
  );
};

export default Post;
