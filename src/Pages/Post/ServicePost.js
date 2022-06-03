import React, { useState } from "react";
import Button from "../../Components/Button";
import Input from "../../Components/Input";
import "./ServicePost.css";

const ServicePost = ({ renderComponent, skills, categories }) => {
  //   const [fileInput, setFileInput] = useState("");
  let key = 0;
  const skillsIds = skills[0] || "";
  const skillsName = skills[1] || [];
  const categoriesIds = categories[0] || "";
  const categoriesName = categories[1] || [];

  const handleFileInput = (val) => {
    console.log(val);
  };

  const createServicePost = (e) => {
    console.log(e);
  };

  return (
    <div>
      <div className="headerConatiner">
        <span className="headerText">Give a Service</span>
      </div>
      <div className="inputContainer">
        <span className="labelText">Post Type</span>
        <div className="postTypeButtons">
          <Button btnContent={"Give"} className={"giveBtn postActive"} />
          <Button btnContent={"Receive"} className={"receiveBtn"} />
        </div>
        <div className="giftContainer">
          <span className="labelText">Gift</span>
          <input type="checkbox" className="giftCheck" />
        </div>
        <span className="labelText">Post Title</span>
        <Input type={"text"} className={"postTitleInput"} />
        <span className="labelText">Post Description</span>
        <textarea className="descriptionInput" rows="7"></textarea>
        <span className="labelText">Post Image</span>
        <Input
          type={"file"}
          className={"postImageInput"}
          OnInputChange={handleFileInput}
        />
        <span className="labelText">Add Required Skills</span>
        <Button
          btnContent={"+ Add Skill"}
          className={"addSkillsBtn"}
          onBtnClick={() => renderComponent(2)}
        />
        {skillsName.map((skill) => (
          <span className="selectedSkills" key={key++}>
            {skill}
          </span>
        ))}
        <span className="labelText">Add Required Category</span>
        <Button
          btnContent={"+ Add Category"}
          className={"addCategoryBtn"}
          onBtnClick={() => renderComponent(3)}
        />
        {categoriesName.map((category) => (
          <span className="selectedSkills" key={key++}>
            {category}
          </span>
        ))}
        <Button
          btnContent={"Create Post"}
          className={"btnGrey"}
          onBtnClick={createServicePost}
          btnDisable={true}
        />
      </div>
    </div>
  );
};

export default React.memo(ServicePost);
