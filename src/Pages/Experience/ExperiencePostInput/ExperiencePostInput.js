import React, { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ExperiencePostContext } from "../ExperiencePost";
import { modalInitialState, requestHeader } from "../../../Library/Constants";
import { getCall, postCall } from "../../../Components/Services/DataFetch";
import Header from "../../../Components/Header/Header";
import Modal from "../../../Components/Modal/Modal";
import PostTextAndImageForm from "../../../Components/PostTextAndImageForm/PostTextAndImageForm";
import "./ExperiencePostInput.css";
import Button from "../../../Components/Button/Button";
import StartDate from "../../../Components/StartDate/StartDate";
import SkillAndCategoryDisplay from "../../../Components/SkillAndCategoryDisplay/SkillAndCategoryDisplay";

const ExperiencePostInput = ({ renderComponent }) => {
  const navigate = useNavigate();
  const [experiencePostData, setExperiencePostData] = useContext(
    ExperiencePostContext
  );
  const [modal, setModal] = useState(modalInitialState);
  const [buttonData, setButtonData] = useState({
    value: "Create Experience",
    isActive: false,
  });
  const moderatorsArray = ["John", "Shawn", "Riya", "Chris", "Tom"];

  const handleExperiencePostTitle = (val) => {
    setExperiencePostData({ ...experiencePostData, experience_name: val });
  };
  const handleExperiencePostDescription = (val) => {
    setExperiencePostData({ ...experiencePostData, experience_desc: val });
  };
  const handleExperiencePostImage = (val, fileExtension) => {
    setExperiencePostData({
      ...experiencePostData,
      experience_image: val,
      image_url: fileExtension,
    });
  };
  const handleStartDate = (val) => {
    setExperiencePostData({ ...experiencePostData, start_time: val });
  };

  const enableCreatePostButton = () => {
    if (
      experiencePostData.experience_name.trim() !== "" &&
      experiencePostData.experience_desc.trim() !== "" &&
      experiencePostData.experience_desc.trim().length < 201 &&
      experiencePostData.skills_required !== ""
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
    titleValue: experiencePostData.experience_name,
    descriptionValue: experiencePostData.experience_desc,
    postTitleLabel: "Post Title",
    postDescriptionLabel: "Post Description",
    postImageLabel: "Post Images",
  };

  const createItemPost = async (e) => {
    e.preventDefault();
    setButtonData({ value: "Please wait...", isActive: false });
    try {
      if (experiencePostData.image_url) {
        const getUploadData = await getCall(
          `upload/url?file_extension=${experiencePostData.image_url}`,
          requestHeader
        );
        if (getUploadData) {
          const data = await fetch(getUploadData.upload_url, {
            method: "PUT",
            body: experiencePostData.experience_image,
          });
          if (data.status !== 200) {
            setModal({
              modalContent: "Something Went Wrong!! Try again..",
              showModal: true,
            });
            setButtonData({ value: "Create Experience", isActive: true });
          } else {
            experiencePostData.experience_image = getUploadData.image_id;
            experiencePostData.start_time = new Date(
              experiencePostData.start_time
            ).getTime();
            const data = await postCall(
              "/items",
              experiencePostData,
              requestHeader
            );
            if (data) {
              navigate("/home");
            }
          }
        }
      }
    } catch (err) {
      setButtonData({ value: "Create Experience", isActive: true });
      setModal({ modalContent: err, showModal: true });
    }
  };

  return (
    <div>
      {modal.showModal && (
        <Modal modalContent={modal.modalContent} closeModal={setModal} />
      )}
      <Header navigateTo="home" headerText="Create an Experience" />
      <form onChange={enableCreatePostButton} onSubmit={createItemPost}>
        <div className="inputContainer">
          <PostTextAndImageForm
            postData={textAndImageData}
            handlePostTitle={handleExperiencePostTitle}
            handlePostDescription={handleExperiencePostDescription}
            handlePostImage={handleExperiencePostImage}
          />
          <SkillAndCategoryDisplay
            type="skills"
            renderComponent={renderComponent}
            dataArray={experiencePostData.skills_array}
          />
          <StartDate
            dateValue={experiencePostData.start_time}
            handleStartDate={handleStartDate}
          />
          <div className="moderatorContainer">
            <div className="moderatorInput">
              <h3 className="moderatorTitle">Moderators</h3>
              <div className="moderators">
                {moderatorsArray.length <= 4
                  ? moderatorsArray.join(",")
                  : moderatorsArray.slice(0, 4).join(",") +
                    "..." +
                    ` +${+moderatorsArray.length - 4} others`}
              </div>
            </div>
            <div
              className="selectModerators"
              onClick={() => renderComponent("moderators")}
            >
              {">"}
            </div>
          </div>
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

export default React.memo(ExperiencePostInput);
