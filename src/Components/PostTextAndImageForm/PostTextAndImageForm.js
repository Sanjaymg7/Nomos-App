import React, { useState } from "react";
import Input from "../Input/Input";
import Label from "../Label/Label";
import "./PostTextAndImageForm.css";

const PostTextAndImageForm = ({
  postData,
  handlePostTitle,
  handlePostDescription,
  handlePostImage,
}) => {
  const [descriptionCount, setDescriptionCount] = useState(0);

  const fileUploadInputChange = (file) => {
    const imageURL = file.name;
    const fileExtension = imageURL.slice(imageURL.lastIndexOf(".") + 1);
    if (file) {
      let reader = new FileReader();
      reader.onload = function () {
        handlePostImage(reader.result, fileExtension);
      };
      reader.readAsText(file);
    } else {
      handlePostImage("");
    }
  };

  return (
    <div>
      <Input
        type={"text"}
        value={postData.titleValue}
        className={"postTitleInput"}
        onInputChange={handlePostTitle}
        labelContent={postData.postTitleLabel}
      />
      <Label className="labelText" labelName={postData.postDescriptionLabel} />
      <div className="descriptionContainer">
        <textarea
          className="descriptionInput"
          value={postData.descriptionValue}
          rows="7"
          onChange={(e) => {
            setDescriptionCount(e.target.value.length);
            handlePostDescription(e.target.value);
          }}
        ></textarea>
        <span className="descriptionCount">{descriptionCount} / 200</span>
      </div>
      <Label className="labelText" labelName={postData.postImageLabel} />
      <input
        type={"file"}
        className={"postImageInput"}
        onChange={(e) =>
          fileUploadInputChange(e.target.files[0] ? e.target.files[0] : null)
        }
      />
    </div>
  );
};

export default React.memo(PostTextAndImageForm);
