import React, { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ExperiencePostContext } from "./ExperiencePost";
import {
  modalInitialState,
  getRequestHeader,
  getImageURL,
} from "../../Library/Constants";
import { postCall } from "../../Components/Services/DataFetch";
import Header from "../../Components/Header/Header";
import Modal from "../../Components/Modal/Modal";
import PostTextAndImageForm from "../../Components/PostTextAndImageForm/PostTextAndImageForm";
import Button from "../../Components/Button/Button";
import StartDate from "../../Components/StartDate/StartDate";
import SkillAndCategoryDisplay from "../../Components/SkillAndCategoryDisplay/SkillAndCategoryDisplay";
import UserDisplay from "../../Components/UserDisplay/UserDisplay";

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

  const createExperiencePost = async (e) => {
    e.preventDefault();
    setButtonData({ value: "Please wait...", isActive: false });
    try {
      experiencePostData.experience_image = await getImageURL(
        experiencePostData.image_url,
        experiencePostData.experience_image
      );
      experiencePostData.start_time = new Date(
        experiencePostData.start_time
      ).getTime();
      const data = await postCall(
        "/experience",
        experiencePostData,
        getRequestHeader()
      );
      if (data) {
        navigate("/home");
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
      <form onChange={enableCreatePostButton} onSubmit={createExperiencePost}>
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
          <UserDisplay
            namesArray={experiencePostData.moderator_user_name}
            renderComponent={renderComponent}
            userType="Moderator"
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

export default React.memo(ExperiencePostInput);
