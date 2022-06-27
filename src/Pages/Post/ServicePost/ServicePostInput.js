import React, { useState, useContext, useEffect } from "react";
import { ModalContext, PostContext } from "../../../Components/Context/Context";
import { useNavigate } from "react-router-dom";
import {
  service,
  home,
  waitingMessage,
  createPost,
} from "../../../Library/Constants";
import { imageURLService } from "../../../Components/Services/ImageURLService";
import { postCall } from "../../../Components/Services/DataFetch";
import Button from "../../../Components/Button/Button";
import "./ServicePostInput.css";
import Header from "../../../Components/Header/Header";
import Modal from "../../../Components/Modal/Modal";
import PostTypeAndGiftForm from "../../../Components/PostTypeAndGiftForm/PostTypeAndGiftForm";
import PostTextAndImageForm from "../../../Components/PostTextAndImageForm/PostTextAndImageForm";
import SkillAndCategoryDisplay from "../../../Components/SkillAndCategoryDisplay/SkillAndCategoryDisplay";

const ServicePostInput = ({ renderComponent }) => {
  const navigate = useNavigate();
  const [postData, setPostData] = useContext(PostContext);
  const [buttonData, setButtonData] = useState({
    value: createPost,
    isActive: false,
  });
  const [modal, setModal] = useContext(ModalContext);

  const handlePostTitle = (val) => {
    setPostData({ ...postData, items_service_name: val });
  };

  const handleDescriptionChange = (val) => {
    if (val.length <= 200)
      setPostData({ ...postData, items_service_desc: val });
  };

  const handlePostType = (val) => {
    setPostData({ ...postData, dealing_type: val });
  };

  const handleGiftCheckChange = (val) => {
    setPostData({ ...postData, is_gift: val });
  };

  const handleServicePostImage = (images, extensions) => {
    if (images) {
      setPostData({
        ...postData,
        items_service_image: images,
        image_url: extensions,
      });
    }
  };

  const enableCreatePostButton = () => {
    if (
      postData.items_service_name.trim() !== "" &&
      postData.items_service_desc.trim() !== "" &&
      postData.items_service_desc.trim().length < 201 &&
      postData.skills_required !== "" &&
      postData.category_required !== ""
    ) {
      setButtonData({ ...buttonData, isActive: true });
    } else {
      setButtonData({ ...buttonData, isActive: false });
    }
  };

  useEffect(() => {
    enableCreatePostButton();
  }, []);

  const createServicePost = async (e) => {
    e.preventDefault();
    setButtonData({ value: waitingMessage, isActive: false });
    try {
      if (postData.items_service_image) {
        postData.items_service_image = await imageURLService(
          postData.image_url[0],
          postData.items_service_image[0]
        );
      }
      const data = await postCall(service, postData);
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
    giveLabel: "Give",
    receiveLabel: "Receive",
    dealing_type_value: postData.dealing_type,
    is_gift_value: postData.is_gift,
  };

  const textAndImageData = {
    titleValue: postData.items_service_name,
    descriptionValue: postData.items_service_desc,
    postTitleLabel: "Post Title",
    postDescriptionLabel: "Post Description",
    postImageLabel: "Post Images",
  };

  return (
    <div>
      {modal.showModal && <Modal />}
      <Header navigateTo="home" headerText="Give a Service" />
      <form onChange={enableCreatePostButton} onSubmit={createServicePost}>
        <div className="inputContainer">
          <PostTypeAndGiftForm
            postData={typeAndGiftData}
            handlePostType={handlePostType}
            handleGiftCheckChange={handleGiftCheckChange}
          />
          <PostTextAndImageForm
            postData={textAndImageData}
            handlePostTitle={handlePostTitle}
            handlePostDescription={handleDescriptionChange}
            handlePostImage={handleServicePostImage}
          />
          <SkillAndCategoryDisplay
            type="skills"
            renderComponent={renderComponent}
            dataArray={postData.skills_array}
          />
          <SkillAndCategoryDisplay
            type="category"
            renderComponent={renderComponent}
            dataArray={postData.categories_array}
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

export default React.memo(ServicePostInput);
