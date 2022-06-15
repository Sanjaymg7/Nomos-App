import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { PostContext } from "../ServicePost";
import {
  modalInitialState,
  getImageURL,
  getRequestHeader,
} from "../../../Library/Constants";
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
    value: "Create Post",
    isActive: false,
  });
  const [modal, setModal] = useState(modalInitialState);

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

  const handleServicePostImage = (val, fileExtension) => {
    if (val) {
      setPostData({
        ...postData,
        items_service_image: val,
        image_url: fileExtension,
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
    setButtonData({ value: "Please wait...", isActive: false });
    try {
      postData.items_service_image = await getImageURL(
        postData.image_url,
        postData.items_service_image
      );
      const data = await postCall("/service", postData, getRequestHeader());
      if (data) {
        navigate("/home");
      }
    } catch (err) {
      setModal({ modalContent: err, showModal: true });
    } finally {
      setButtonData({ value: "Create Post", isActive: true });
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
      {modal.showModal && (
        <Modal modalContent={modal.modalContent} closeModal={setModal} />
      )}
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
