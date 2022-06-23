import React, { useState } from "react";
import {
  PostContext,
  communityPostInitData,
} from "../../Components/Context/Context";
import Friends from "../../Components/Friends/Friends";
import CommunityPostInput from "./CommunityPostInput";

const CommunityPost = () => {
  const [communityPostData, setCommunityPostData] = useState(
    communityPostInitData
  );
  const [componentState, setComponentState] = useState("CommunityPostInput");

  const renderComponent = (state) => {
    setComponentState(state);
  };

  const handleFriendsSubmit = (userIds, userNames, userType) => {
    if (userType === "Participants") {
      setCommunityPostData({
        ...communityPostData,
        participants_id: userIds.join(","),
        participants_names: userNames,
      });
    } else {
      setCommunityPostData({
        ...communityPostData,
        administrator_id: userIds.join(","),
        administrator_names: userNames,
      });
    }
    renderComponent("CommunityPostInput");
  };

  return (
    <div>
      <PostContext.Provider value={[communityPostData, setCommunityPostData]}>
        {componentState === "CommunityPostInput" && (
          <CommunityPostInput renderComponent={renderComponent} />
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

export default CommunityPost;
