import React, { useState } from "react";
import { PostContext, postInitData } from "../../Components/Context/Context";
import Friends from "../../Components/Friends/Friends";
import SkillAndCategoryForm from "../../Components/SkillAndCategoryForm/SkillAndCategoryForm";
import PostData from "./PostData/PostData";

const Post = () => {
  const [postData, setPostData] = useState(postInitData);
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

  const handleFriendsSubmit = (userIds, userNames, userType) => {
    if (userType === "Participants" || userType === "Moderator") {
      setPostData({
        ...postData,
        participants_id: userIds.join(","),
        participants_names: userNames,
      });
    } else {
      setPostData({
        ...postData,
        administrator_id: userIds.join(","),
        administrator_names: userNames,
      });
    }
    renderComponent("postData");
  };

  return (
    <div>
      <PostContext.Provider value={[postData, setPostData]}>
        {componentState === "postData" && (
          <PostData renderComponent={renderComponent} />
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
        {componentState === "moderator" && (
          <Friends
            handleFriendsSubmit={handleFriendsSubmit}
            selectType="single"
            userType="Moderator"
          />
        )}
        {componentState === "participants" && (
          <Friends
            handleFriendsSubmit={handleFriendsSubmit}
            selectType="multiple"
            userType="Participants"
          />
        )}
        {componentState === "admins" && (
          <Friends
            handleFriendsSubmit={handleFriendsSubmit}
            selectType="multiple"
            userType="Admins"
          />
        )}
      </PostContext.Provider>
    </div>
  );
};

export default Post;
