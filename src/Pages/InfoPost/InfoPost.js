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
    urls_extension: "",
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

  const handleInfoPostImage = (images, extensions) => {
    if (images) {
      setPostData({
        ...postData,
        photo_urls: images,
        urls_extension: extensions,
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
      if (postData.photo_urls) {
        const blobImages = postData.photo_urls;
        const extensions = postData.urls_extension;
        const images = [];
        for (let i = 0; i < blobImages.length; i++) {
          images.push({
            id: await imageURLService(extensions[i], blobImages[i]),
          });
        }
        postData.photo_urls = JSON.stringify(images);
      }
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
            handlePostImage={handleInfoPostImage}
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
