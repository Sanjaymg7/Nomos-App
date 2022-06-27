import React, { useContext, useState, useEffect } from "react";
import { ModalContext, PostContext } from "../../Components/Context/Context";
import { useNavigate } from "react-router-dom";
import {
  items,
  home,
  waitingMessage,
  createPost,
} from "../../Library/Constants";
import { imageURLService } from "../../Components/Services/ImageURLService";
import { postCall } from "../../Components/Services/DataFetch";
import Header from "../../Components/Header/Header";
import PostTextAndImageForm from "../../Components/PostTextAndImageForm/PostTextAndImageForm";
import PostTypeAndGiftForm from "../../Components/PostTypeAndGiftForm/PostTypeAndGiftForm";
import Button from "../../Components/Button/Button";
import Modal from "../../Components/Modal/Modal";
import SkillAndCategoryDisplay from "../../Components/SkillAndCategoryDisplay/SkillAndCategoryDisplay";
import Input from "../../Components/Input/Input";

const ItemPostInput = ({ renderComponent }) => {
  const navigate = useNavigate();
  const [itemPostData, setItemPostData] = useContext(PostContext);
  const [buttonData, setButtonData] = useState({
    value: createPost,
    isActive: false,
  });
  const [modal, setModal] = useContext(ModalContext);

  const handleItemPostTitle = (val) => {
    setItemPostData({ ...itemPostData, items_service_name: val });
  };
  const handleItemPostDescription = (val) => {
    setItemPostData({ ...itemPostData, items_service_desc: val });
  };
  const handleItemPostImage = (images, extensions) => {
    if (images) {
      setItemPostData({
        ...itemPostData,
        items_service_image: images,
        image_url: extensions,
      });
    }
  };
  const handlePostType = (val) => {
    setItemPostData({ ...itemPostData, dealing_type: val });
  };
  const handleGiftCheckChange = (val) => {
    setItemPostData({ ...itemPostData, is_gift: val });
  };
  const handleStartDate = (val) => {
    setItemPostData({ ...itemPostData, start_time: val });
  };

  const enableCreatePostButton = () => {
    if (
      itemPostData.items_service_name.trim() !== "" &&
      itemPostData.items_service_desc.trim() !== "" &&
      itemPostData.items_service_desc.trim().length < 201 &&
      itemPostData.category_required !== ""
    ) {
      setButtonData({ ...buttonData, isActive: true });
    } else {
      setButtonData({ ...buttonData, isActive: false });
    }
  };

  useEffect(() => {
    enableCreatePostButton();
  }, []);

  const createItemPost = async (e) => {
    e.preventDefault();
    setButtonData({ value: waitingMessage, isActive: false });
    try {
      if (itemPostData.items_service_image) {
        itemPostData.items_service_image = await imageURLService(
          itemPostData.image_url[0],
          itemPostData.items_service_image[0]
        );
      }
      itemPostData.start_time = new Date(itemPostData.start_time).getTime();
      const data = await postCall(items, itemPostData);
      if (data) {
        navigate(home);
      }
    } catch (err) {
      setButtonData({ value: createPost, isActive: true });
      setModal({ modalContent: err, showModal: true });
    }
  };

  const textAndImageData = {
    titleValue: itemPostData.items_service_name,
    descriptionValue: itemPostData.items_service_desc,
    postTitleLabel: "Post Title",
    postDescriptionLabel: "Post Description",
    postImageLabel: "Post Images",
  };

  const typeAndGiftData = {
    giveLabel: "Offering an Item",
    receiveLabel: "Request an Item",
    dealing_type_value: itemPostData.dealing_type,
    is_gift_value: itemPostData.is_gift,
  };

  return (
    <div>
      {modal.showModal && <Modal />}
      <Header navigateTo="home" headerText="Offer or Request an Item" />
      <form onChange={enableCreatePostButton} onSubmit={createItemPost}>
        <div className="inputContainer">
          <PostTypeAndGiftForm
            postData={typeAndGiftData}
            handlePostType={handlePostType}
            handleGiftCheckChange={handleGiftCheckChange}
          />
          <PostTextAndImageForm
            postData={textAndImageData}
            handlePostTitle={handleItemPostTitle}
            handlePostDescription={handleItemPostDescription}
            handlePostImage={handleItemPostImage}
          />
          <SkillAndCategoryDisplay
            type="category"
            renderComponent={renderComponent}
            dataArray={itemPostData.categories_array}
          />
          <Input
            type="date"
            value={itemPostData.start_time}
            onInputChange={handleStartDate}
            labelContent="Start Date (optional)"
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

export default React.memo(ItemPostInput);
