import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  createPost,
  home,
  info,
  waitingMessage,
} from "../../Library/Constants";
import { postCall } from "../../Components/Services/DataFetch";
import { ModalContext } from "../../Components/Context/Context";
import Modal from "../../Components/Modal/Modal";
import Header from "../../Components/Header/Header";
import PostTextAndImageForm from "../../Components/PostTextAndImageForm/PostTextAndImageForm";
import Button from "../../Components/Button/Button";
import { imageURLService } from "../../Components/Services/ImageURLService";

const InfoPost = () => {
  const navigate = useNavigate();
  const [modal, setModal] = useContext(ModalContext);
  const [postData, setPostData] = useState({
    info_name: "",
    info_desc: "",
    photo_urls: "",
    image_url: "",
    location:
      '{"lat":12.9141417,"lng":74.8559568,"name":"Mangalore,Karnataka,India"}',
  });
  const [buttonData, setButtonData] = useState({
    value: createPost,
    isActive: false,
  });

  const handlePostTitle = (val) => {
    setPostData({ ...postData, info_name: val });
  };

  const handleDescriptionChange = (val) => {
    if (val.length <= 200) setPostData({ ...postData, info_desc: val });
  };

  const handleServicePostImage = (val, fileExtension) => {
    if (val) {
      setPostData({
        ...postData,
        photo_urls: val,
        image_url: fileExtension,
      });
    }
  };

  const enableCreatePostButton = () => {
    if (
      postData.info_name.trim() !== "" &&
      postData.info_desc.trim() !== "" &&
      postData.info_desc.trim().length < 201
    ) {
      setButtonData({ ...buttonData, isActive: true });
    } else {
      setButtonData({ ...buttonData, isActive: false });
    }
  };

  const createInfoPost = async (e) => {
    e.preventDefault();
    setButtonData({ value: waitingMessage, isActive: false });
    try {
      postData.photo_urls = await imageURLService(
        postData.image_url,
        postData.photo_urls
      );
      const data = await postCall(info, postData);
      if (data) {
        navigate(home);
      }
    } catch (err) {
      setModal({ modalContent: err, showModal: true });
    } finally {
      setButtonData({ value: createPost, isActive: true });
    }
  };

  const textAndImageData = {
    titleValue: postData.info_name,
    descriptionValue: postData.info_desc,
    postTitleLabel: "Post Title",
    postDescriptionLabel: "Post Description",
    postImageLabel: "Post Images",
  };

  return (
    <div>
      {modal.showModal && <Modal />}
      <Header navigateTo="home" headerText="Info Post" />
      <form onChange={enableCreatePostButton} onSubmit={createInfoPost}>
        <div className="inputContainer">
          <PostTextAndImageForm
            postData={textAndImageData}
            handlePostTitle={handlePostTitle}
            handlePostDescription={handleDescriptionChange}
            handlePostImage={handleServicePostImage}
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

export default InfoPost;
