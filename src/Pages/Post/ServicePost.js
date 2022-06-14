import React, { createContext, useState } from "react";
import SkillsAndCategoryComponent from "./SkillsAndCategoryComponent";
import ServicePostInput from "./ServicePost/ServicePostInput";
import SkillAndCategoryForm from "../../Components/SkillAndCategoryForm/SkillAndCategoryForm";

export const PostContext = createContext();

const Post = () => {
  const initState = {
    dealing_type: 1,
    is_gift: false,
    items_service_name: "",
    items_service_desc: "",
    items_service_image: "",
    skills_required: "",
    category_required: "",
    skills_array: [],
    categories_array: [],
    location:
      '{"lat":12.9141417,"lng":74.8559568,"name":"Mangalore,Karnataka,India"}',
    image_url: "",
  };
  const [postData, setPostData] = useState(initState);
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
