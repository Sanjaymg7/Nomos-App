import React, { useState, useEffect } from "react";
import { requestHeader } from "../../../Library/Constants";
import { getCall, putCall } from "../../../Components/Services/DataFetch";
import Button from "../../../Components/Button/Button";
import "./SkillsComponent.css";

const SkillsComponent = ({ renderComponent }) => {
  const [skillsArray, setSkillsArray] = useState([]);
  const [skills, setSkills] = useState([]);
  const [skillCount, setSkillCount] = useState(0);

  const getData = async () => {
    try {
      const data = await getCall("master/skills", requestHeader);
      if (data) {
        setSkillsArray(
          data.skills.map((skill) => ({ ...skill, isChecked: false }))
        );
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const btnClickHandler = async (e) => {
    const skillsAddBody = {
      skils_list: skills.join(","),
    };
    try {
      const data = await putCall("users", skillsAddBody, requestHeader);
      if (data) {
        renderComponent("CommunityComponent");
      }
    } catch (err) {
      console.log(err);
    }
  };

  const skillHandler = (skill, index) => {
    if (skills.includes(skill.skill_id)) {
      skills.splice(skills.indexOf(skill.skill_id), 1);
      setSkills(skills);
      setSkillCount(skillCount - 1);
      skillsArray[index].isChecked = false;
      setSkillsArray(skillsArray);
    } else {
      setSkills([...skills, skill.skill_id]);
      setSkillCount(skillCount + 1);
      skillsArray[index].isChecked = true;
      setSkillsArray(skillsArray);
    }
  };

  return (
    <div className="comp3Container">
      <h3 className="comp3h3">Selected Skills ({skillCount})</h3>
      <span className="comp3text">Skills are shown on your profile</span>
      <div className="skillContainer">
        {skillsArray.map((skill, index) => (
          <Button
            key={index}
            btnContent={skill.skill_name}
            className={skill.isChecked ? "skillBtn skillBtnActive" : "skillBtn"}
            onBtnClick={() => skillHandler(skill, index)}
          />
        ))}
      </div>
      <Button
        btnContent={"Next"}
        className={"btnGreen"}
        onBtnClick={btnClickHandler}
      />
    </div>
  );
};

export default React.memo(SkillsComponent);
