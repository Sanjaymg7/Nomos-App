import React, { createContext, useState } from "react";
import SkillsAndCategoryComponent from "./SkillsAndCategoryComponent";
import ServicePost from "./ServicePost";

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
  };
  const [postData, setPostData] = useState(initState);
  const [componentState, setComponentState] = useState("postData");

  const renderComponent = (state) => {
    setComponentState(state);
  };

  return (
    <div>
      <PostContext.Provider value={[postData, setPostData]}>
        {componentState === "postData" ? (
          <ServicePost renderComponent={renderComponent} />
        ) : componentState === "skills" ? (
          <SkillsAndCategoryComponent
            renderComponent={renderComponent}
            component={"skills"}
          />
        ) : (
          <SkillsAndCategoryComponent
            renderComponent={renderComponent}
            component={"category"}
          />
        )}
      </PostContext.Provider>
    </div>
  );
};

export default React.memo(Post);
