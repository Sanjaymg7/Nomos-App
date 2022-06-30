import React, { useState } from "react";
import Input from "../Input/Input";
import Label from "../Label/Label";
import "./PostTextAndImageForm.css";

const PostTextAndImageForm = ({
  textAndImageData,
  handlePostTitle,
  handlePostDescription,
  handlePostImage,
  handleDeleteImage,
}) => {
  const [descriptionCount, setDescriptionCount] = useState(0);

  const handleImageRemove = (index) => {
    handleDeleteImage(index);
  };

  const fileUploadInputChange = (files) => {
    if (files) {
      const images = [];
      const extensions = [];
      const names = [];
      files.forEach((file) => {
        const imageURL = file.name;
        const fileExtension = imageURL.slice(imageURL.lastIndexOf(".") + 1);
        images.push(new Blob([file], { type: `image/${fileExtension}` }));
        extensions.push(fileExtension);
        names.push(file.name);
      });
      handlePostImage(images, extensions, names);
    } else {
      handlePostImage("");
    }
  };

  return (
    <div>
      <Input
        type={"text"}
        value={textAndImageData.titleValue}
        className={"postTitleInput"}
        onInputChange={handlePostTitle}
        labelContent={textAndImageData.postTitleLabel}
      />
      <Label
        className="labelText"
        labelName={textAndImageData.postDescriptionLabel}
      />
      <div className="descriptionContainer">
        <textarea
          className="descriptionInput"
          value={textAndImageData.descriptionValue}
          rows="7"
          onChange={(e) => {
            setDescriptionCount(e.target.value.length);
            handlePostDescription(e.target.value);
          }}
        ></textarea>
        <span className="descriptionCount">{descriptionCount} / 200</span>
      </div>
      <Label
        className="labelText"
        labelName={textAndImageData.postImageLabel}
      />
      {textAndImageData.imageValue.length > 0 ? (
        textAndImageData.imageValue.map((name, index) => (
          <div key={index}>
            <div className="imageNameContainer">
              <h4 className="imageName">{name}</h4>
              <div
                className="removeImage"
                onClick={() => handleImageRemove(index)}
              >
                x
              </div>
            </div>
          </div>
        ))
      ) : (
        <input
          type={"file"}
          className={"postImageInput"}
          multiple
          onChange={(e) =>
            fileUploadInputChange(
              e.target.files[0] ? [...e.target.files] : null
            )
          }
        />
      )}
    </div>
  );
};

export default React.memo(PostTextAndImageForm);
