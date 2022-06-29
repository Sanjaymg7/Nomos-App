import React, { useState, useContext, useEffect } from "react";
import { ModalContext, PostContext } from "../../../Components/Context/Context";
import { useLocation, useNavigate } from "react-router-dom";
import { home, waitingMessage, createPost } from "../../../Library/Constants";
import { imageURLService } from "../../../Components/Services/ImageURLService";
import Button from "../../../Components/Button/Button";
import "./ServicePostInput.css";
import Header from "../../../Components/Header/Header";
import Modal from "../../../Components/Modal/Modal";
import PostTypeAndGiftForm from "../../../Components/PostTypeAndGiftForm/PostTypeAndGiftForm";
import PostTextAndImageForm from "../../../Components/PostTextAndImageForm/PostTextAndImageForm";
import SkillAndCategoryDisplay from "../../../Components/SkillAndCategoryDisplay/SkillAndCategoryDisplay";
import Input from "../../../Components/Input/Input";
import UserDisplay from "../../../Components/UserDisplay/UserDisplay";
import { getUploadData } from "./UploadData";
import { postCall } from "../../../Components/Services/DataFetch";

const PostData = ({ renderComponent }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const type = location.pathname.slice(1);
  const [postData, setPostData] = useContext(PostContext);
  const [buttonData, setButtonData] = useState({
    value: createPost,
    isActive: true,
  });
  const [modal, setModal] = useContext(ModalContext);

  const handlePostType = (val) => {
    setPostData({ ...postData, dealing_type: val });
  };

  const handleGiftCheckChange = (val) => {
    setPostData({ ...postData, is_gift: val });
  };

  const handlePostTitle = (val) => {
    setPostData({ ...postData, title: val });
  };

  const handleDescriptionChange = (val) => {
    if (val.length <= 200) setPostData({ ...postData, description: val });
  };

  const handleServicePostImage = (images, extensions) => {
    if (images) {
      setPostData({
        ...postData,
        image: images,
        image_extension: extensions,
      });
    }
  };

  const handleStartDate = (val) => {
    setPostData({ ...postData, start_date: val });
  };

  const handleExperienceParticipants = (val) => {
    if (val) setPostData({ ...postData, max_participants: val });
  };

  const enableCreatePostButton = () => {
    //   if (
    //     postData.items_service_name.trim() !== "" &&
    //     postData.items_service_desc.trim() !== "" &&
    //     postData.items_service_desc.trim().length < 201 &&
    //     postData.skills_required !== "" &&
    //     postData.category_required !== ""
    //   ) {
    //     setButtonData({ ...buttonData, isActive: true });
    //   } else {
    //     setButtonData({ ...buttonData, isActive: false });
    //   }
  };

  // useEffect(() => {
  //   setPostData({ ...postData, type: location.pathname.slice(1) });
  //   enableCreatePostButton();
  // }, []);

  const submitPost = async (e) => {
    e.preventDefault();
    setButtonData({ value: waitingMessage, isActive: false });
    try {
      if (postData.image.length > 0) {
        postData.image = await imageURLService(
          postData.image_extension[0],
          postData.image[0]
        );
      }
      const uploadData = getUploadData(postData, type);
      const data = await postCall(type, uploadData);
      if (data) {
        navigate(home);
      }
    } catch (err) {
      setModal({ modalContent: err, showModal: true });
    } finally {
      setButtonData({ value: createPost, isActive: true });
    }
  };

  const typeAndGiftData = {
    giveLabel: type === "service" ? "Give" : "Offering an Item",
    receiveLabel: type === "service" ? "Receive" : "Request an Item",
    dealing_type_value: postData.dealing_type,
    is_gift_value: postData.is_gift,
  };

  const textAndImageData = {
    titleValue: postData.title,
    descriptionValue: postData.description,
    postTitleLabel: type === "community" ? "Community Name" : "Post Title",
    postDescriptionLabel:
      type === "community" ? "Community Description" : "Post Description",
    postImageLabel: type === "community" ? "Display Image" : "Post Images",
  };

  return (
    <div>
      {modal.showModal && <Modal />}
      <Header
        navigateTo="home"
        headerText={type[0].toUpperCase() + type.substring(1) + " Post"}
      />
      <form onChange={enableCreatePostButton} onSubmit={submitPost}>
        <div className="inputContainer">
          {(type === "service" || type === "items") && (
            <PostTypeAndGiftForm
              postData={typeAndGiftData}
              handlePostType={handlePostType}
              handleGiftCheckChange={handleGiftCheckChange}
            />
          )}
          <PostTextAndImageForm
            postData={textAndImageData}
            handlePostTitle={handlePostTitle}
            handlePostDescription={handleDescriptionChange}
            handlePostImage={handleServicePostImage}
          />
          {(type === "service" || type === "experience") && (
            <SkillAndCategoryDisplay
              type="skills"
              renderComponent={renderComponent}
              dataArray={postData.skills_array}
            />
          )}
          {(type === "service" || type === "items") && (
            <SkillAndCategoryDisplay
              type="category"
              renderComponent={renderComponent}
              dataArray={postData.categories_array}
            />
          )}
          {type === "experience" && (
            <div>
              <Input
                type="number"
                value={postData.max_participants}
                labelContent="Total No: of Participants"
                onInputChange={handleExperienceParticipants}
              />
              <UserDisplay
                namesArray={postData.participants_names}
                renderComponent={renderComponent}
                userType="Moderator"
              />
            </div>
          )}
          {type === "community" && (
            <div>
              <UserDisplay
                namesArray={postData.participants_names}
                renderComponent={renderComponent}
                userType="Participants"
              />
              <UserDisplay
                namesArray={postData.administrator_names}
                renderComponent={renderComponent}
                userType="Admins"
              />
            </div>
          )}
          {(type === "items" || type === "experience") && (
            <Input
              type="date"
              value={postData.start_date}
              onInputChange={handleStartDate}
              labelContent="Start Date (optional)"
            />
          )}
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

export default React.memo(PostData);
