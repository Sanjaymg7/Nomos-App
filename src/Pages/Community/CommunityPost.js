import React, { createContext, useState } from "react";
import Friends from "../../Components/Friends/Friends";
import CommunityPostInput from "./CommunityPostInput";

export const CommunityPostContext = createContext();

const CommunityPost = () => {
  const initState = {
    community_name: "",
    community_description: "",
    display_picture: "",
    cover_picture: "",
    administrator_id: "",
    participants_id: "",
    administrator_names: [],
    participants_names: [],
    community_location_center:
      '{"lat":12.9141417,"lng":74.8559568,"name":"Mangalore,Karnataka,India"}',
    display_image_url: "",
    cover_image_url: "",
  };

  const [communityPostData, setCommunityPostData] = useState(initState);
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
      <CommunityPostContext.Provider
        value={[communityPostData, setCommunityPostData]}
      >
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
      </CommunityPostContext.Provider>
    </div>
  );
};

export default CommunityPost;
