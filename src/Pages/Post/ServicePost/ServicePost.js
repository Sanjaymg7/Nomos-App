import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { PostContext } from "../Post";
import { modalInitialState } from "../../../Library/Constants";
import { requestHeader } from "../../../Library/Constants";
import { getCall, postCall } from "../../../Components/Services/DataFetch";
import Button from "../../../Components/Button/Button";
import Input from "../../../Components/Input/Input";
import Label from "../../../Components/Label/Label";
import "./ServicePost.css";
import Header from "../../../Components/Header/Header";
import Modal from "../../../Components/Modal/Modal";

const ServicePost = ({ renderComponent }) => {
  const navigate = useNavigate();
  const [postData, setPostData] = useContext(PostContext);
  const [isBtnActive, setBtnActive] = useState(false);
  const [btnContent, setBtnContent] = useState("Create Post");
  const [uploadedImage, setUploadedImage] = useState("");
  const [modal, setModal] = useState(modalInitialState);

  const handleCloseModal = () => {
    setModal(modalInitialState);
  };

  const enableCreatePostButton = () => {
    if (
      postData.items_service_name.trim() !== "" &&
      postData.items_service_desc.trim() !== "" &&
      postData.items_service_desc.trim().length < 201 &&
      postData.skills_required !== "" &&
      postData.category_required !== ""
    ) {
      setBtnActive(true);
    } else {
      setBtnActive(false);
    }
  };

  useEffect(() => {
    enableCreatePostButton();
  }, []);

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

  const addSkillandDescriptionHandler = (val) => {
    renderComponent(val);
  };

  const handleGiftCheckChange = (val) => {
    setPostData({ ...postData, is_gift: val });
  };

  const fileUploadInputChange = (file) => {
    if (file) {
      let reader = new FileReader();
      reader.onload = function () {
        setUploadedImage(reader.result);
      };
      reader.readAsText(file);
    }
  };

  const createServicePost = async (e) => {
    e.preventDefault();
    setBtnContent("Please wait...");
    try {
      const imageURL = e.target[3].value;
      if (imageURL.length !== 0) {
        const fileExtension = imageURL.slice(imageURL.lastIndexOf(".") + 1);
        const getUploadData = await getCall(
          `upload/url?file_extension=${fileExtension}`,
          requestHeader
        );
        if (getUploadData) {
          const data = await fetch(getUploadData.upload_url, {
            method: "PUT",
            body: uploadedImage,
          });
          if (data.status !== 200) {
            setModal({
              modalContent: "Something Went Wrong!! Try again..",
              showModal: true,
            });
            setBtnContent("Create Post");
          } else {
            postData.items_service_image = getUploadData.image_id;
            const data = await postCall("/service", postData, requestHeader);
            if (data) {
              navigate("/home");
            }
          }
        }
      }
    } catch (err) {
      setBtnContent("Create Post");
      setModal({ modalContent: err, showModal: true });
    }
  };

  return (
    <div>
      {modal.showModal && (
        <Modal
          modalContent={modal.modalContent}
          closeModal={handleCloseModal}
        />
      )}
      <Header navigateTo="home" headerText="Give a Service" />
      <form onChange={enableCreatePostButton} onSubmit={createServicePost}>
        <div className="inputContainer">
          <Label className="labelText" labelName="Post Type" />
          <div className="postTypeButtons">
            <div
              className={
                postData.dealing_type === 1 ? "giveBtn postActive" : "giveBtn"
              }
              onClick={() => handlePostType(1)}
            >
              Give
            </div>
            <div
              className={
                postData.dealing_type === 1
                  ? "receiveBtn"
                  : "receiveBtn postActive"
              }
              onClick={() => handlePostType(2)}
            >
              Receive
            </div>
          </div>
          <div className="giftContainer">
            <Label className="labelText" labelName="Gift" />
            <Input
              type={"checkbox"}
              className={"giftCheck"}
              isChecked={postData.is_gift}
              onInputChange={handleGiftCheckChange}
            />
          </div>
          <Input
            type={"text"}
            value={postData.items_service_name}
            className={"postTitleInput"}
            onInputChange={handlePostTitle}
            labelContent="Post Title"
          />
          <Label className="labelText" labelName="Post Description" />
          <div className="descriptionContainer">
            <textarea
              className="descriptionInput"
              value={postData.items_service_desc}
              rows="7"
              onChange={(e) => {
                handleDescriptionChange(e.target.value);
              }}
            ></textarea>
            <span className="descriptionCount">
              {postData.items_service_desc.length} / 200
            </span>
          </div>
          <Label className="labelText" labelName="Add Required Skills" />
          <div
            className="addSkills"
            onClick={() => addSkillandDescriptionHandler("skills")}
          >
            + Add Skill
          </div>
          {postData.skills_array.map((skill, index) => (
            <span className="selectedSkills" key={index}>
              {skill}
            </span>
          ))}
          <Label className="labelText" labelName="Add Required Category" />
          <div
            className="addCategory"
            onClick={() => addSkillandDescriptionHandler("category")}
          >
            + Add Category
          </div>
          {postData.categories_array.map((category, index) => (
            <span className="selectedSkills" key={index}>
              {category}
            </span>
          ))}
          <Label className="labelText" labelName="Post Image" />
          <input
            type={"file"}
            className={"postImageInput"}
            onChange={(e) =>
              fileUploadInputChange(
                e.target.files[0] ? e.target.files[0] : null
              )
            }
          />
          <Button
            btnName={btnContent}
            className={
              isBtnActive ? "createPostBtn btnGreen" : "createPostBtn btnGrey"
            }
            btnDisable={isBtnActive ? false : true}
          />
        </div>
      </form>
    </div>
  );
};

export default React.memo(ServicePost);
