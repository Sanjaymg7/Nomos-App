import React, { useContext, useState, useEffect } from "react";
import { ModalContext } from "../../App";
import { useNavigate } from "react-router-dom";
import { ExperiencePostContext } from "./ExperiencePost";
import { experience, home, waitingMessage } from "../../Library/Constants";
import { imageURLService } from "../../Components/Services/ImageURLService";
import { postCall } from "../../Components/Services/DataFetch";
import Header from "../../Components/Header/Header";
import Modal from "../../Components/Modal/Modal";
import PostTextAndImageForm from "../../Components/PostTextAndImageForm/PostTextAndImageForm";
import Button from "../../Components/Button/Button";
import SkillAndCategoryDisplay from "../../Components/SkillAndCategoryDisplay/SkillAndCategoryDisplay";
import UserDisplay from "../../Components/UserDisplay/UserDisplay";
import Input from "../../Components/Input/Input";

const ExperiencePostInput = ({ renderComponent }) => {
  const navigate = useNavigate();
  const [experiencePostData, setExperiencePostData] = useContext(
    ExperiencePostContext
  );
  const [modal, setModal] = useContext(ModalContext);
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
  const handleExperienceParticipants = (val) => {
    if (val)
      setExperiencePostData({ ...experiencePostData, max_participants: val });
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
      experiencePostData.skills_required !== "" &&
      experiencePostData.max_participants !== "" &&
      experiencePostData.moderator_user_id !== ""
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
    setButtonData({ value: waitingMessage, isActive: false });
    try {
      experiencePostData.experience_image = await imageURLService(
        experiencePostData.image_url,
        experiencePostData.experience_image
      );
      experiencePostData.start_time = new Date(
        experiencePostData.start_time
      ).getTime();
      const data = await postCall(experience, experiencePostData);
      if (data) {
        navigate(home);
      }
    } catch (err) {
      setButtonData({ value: "Create Experience", isActive: true });
      setModal({ modalContent: err, showModal: true });
    }
  };

  return (
    <div>
      {modal.showModal && <Modal />}
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
          <Input
            type="number"
            value={experiencePostData.max_participants}
            labelContent="Total No: of Participants"
            onInputChange={handleExperienceParticipants}
          />
          <UserDisplay
            namesArray={experiencePostData.moderator_user_name}
            renderComponent={renderComponent}
            userType="Moderator"
          />
          <Input
            type="date"
            value={experiencePostData.start_time}
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

export default React.memo(ExperiencePostInput);
