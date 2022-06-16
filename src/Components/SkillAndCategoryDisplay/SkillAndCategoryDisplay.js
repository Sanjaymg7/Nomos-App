import React from "react";
import Label from "../Label/Label";
import "./SkillAndCategoryDisplay.css";

const SkillAndCategoryDisplay = ({ type, renderComponent, dataArray }) => {
  return (
    <div>
      {type === "skills" ? (
        <div>
          <Label className="skillLabelText" labelName="Add Required Skills" />
          <div className="addSkills" onClick={() => renderComponent("skills")}>
            + Add Skill
          </div>
          {dataArray.map((skill, index) => (
            <span className="selectedCategories" key={index}>
              {skill}
            </span>
          ))}
        </div>
      ) : (
        <div>
          <Label className="skillLabelText" labelName="Add Required Category" />
          <div
            className="addCategory"
            onClick={() => renderComponent("category")}
          >
            + Add Category
          </div>
          {dataArray.map((category, index) => (
            <span className="selectedCategories" key={index}>
              {category}
            </span>
          ))}
        </div>
      )}
    </div>
  );
};

export default React.memo(SkillAndCategoryDisplay);
