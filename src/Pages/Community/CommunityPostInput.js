import React, { useContext, useEffect, useState } from "react";
import { ModalContext } from "../../App";
import { useNavigate } from "react-router-dom";
import { CommunityPostContext } from "./CommunityPost";
import { community, home, waitingMessage } from "../../Library/Constants";
import { imageURLService } from "../../Components/Services/ImageURLService";
import { postCall } from "../../Components/Services/DataFetch";
import Header from "../../Components/Header/Header";
import Modal from "../../Components/Modal/Modal";
import Button from "../../Components/Button/Button";
import PostTextAndImageForm from "../../Components/PostTextAndImageForm/PostTextAndImageForm";
import UserDisplay from "../../Components/UserDisplay/UserDisplay";

const CommunityPostInput = ({ renderComponent }) => {
  const navigate = useNavigate();
  const [communityPostData, setCommunityPostData] =
    useContext(CommunityPostContext);
  const [modal, setModal] = useContext(ModalContext);
  const [buttonData, setButtonData] = useState({
    value: "Create Community",
    isActive: false,
  });

  const handleCommunityPostTitle = (val) => {
    setCommunityPostData({ ...communityPostData, community_name: val });
  };
  const handleCommunityPostDescription = (val) => {
    setCommunityPostData({ ...communityPostData, community_description: val });
  };
  const handleCommunityPostImage = (val, fileExtension) => {
    setCommunityPostData({
      ...communityPostData,
      display_picture: val,
      display_image_url: fileExtension,
    });
  };

  const enableCreatePostButton = () => {
    if (
      communityPostData.community_name.trim() !== "" &&
      communityPostData.community_description.trim() !== "" &&
      communityPostData.community_description.trim().length < 201 &&
      communityPostData.administrator_id !== "" &&
      communityPostData.participants_id !== ""
    ) {
      setButtonData({ ...buttonData, isActive: true });
    } else {
      setButtonData({ ...buttonData, isActive: false });
    }
  };

  useEffect(() => {
    enableCreatePostButton();
  }, []);

  const textAndImageData = {
    titleValue: communityPostData.community_name,
    descriptionValue: communityPostData.community_description,
    postTitleLabel: "Community Name",
    postDescriptionLabel: "Community Description",
    postImageLabel: "Display Image",
  };

  const createCommunityPost = async (e) => {
    e.preventDefault();
    setButtonData({ value: waitingMessage, isActive: false });
    try {
      communityPostData.display_picture = await imageURLService(
        communityPostData.display_image_url,
        communityPostData.display_picture
      );
      const data = await postCall(community, communityPostData);
      if (data) {
        navigate(home);
      }
    } catch (err) {
      setButtonData({ value: "Create Community", isActive: true });
      setModal({ modalContent: err, showModal: true });
    }
  };

  return (
    <div>
      {modal.showModal && <Modal />}
      <Header navigateTo="home" headerText="Create a Community" />
      <form onChange={enableCreatePostButton} onSubmit={createCommunityPost}>
        <div className="inputContainer">
          <PostTextAndImageForm
            postData={textAndImageData}
            handlePostTitle={handleCommunityPostTitle}
            handlePostDescription={handleCommunityPostDescription}
            handlePostImage={handleCommunityPostImage}
          />
          <UserDisplay
            namesArray={communityPostData.participants_names}
            renderComponent={renderComponent}
            userType="Participants"
          />
          <UserDisplay
            namesArray={communityPostData.administrator_names}
            renderComponent={renderComponent}
            userType="Admins"
          />
          <Button
            btnName={buttonData.value}
            className={
              buttonData.isActive
                ? "createPostBtn btnGreen"
                : "createPostBtn btnGrey"
            }
            btnDisable={buttonData.isActive ? false : true}
          />
        </div>
      </form>
    </div>
  );
};

export default React.memo(CommunityPostInput);
