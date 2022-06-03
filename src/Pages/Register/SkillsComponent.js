import React, { useState, useEffect } from "react";
import { doGETCall } from "../../DataFetch";
import { doPUTCall } from "../../DataFetch";
import Button from "../../Components/Button";
import "./SkillsComponent.css";

const SkillsComponent = ({ renderComponent, accessToken }) => {
  const requestHeader = {
    "content-type": "application/json",
    access_token: accessToken,
  };
  const [skillsArray, setSkillsArray] = useState([]);
  const [skills, setSkills] = useState([]);
  const [skillCount, setSkillCount] = useState(0);

  useEffect(() => {
    const getData = async () => {
      const data = await doGETCall("master/skills", requestHeader);
      if (data) {
        setSkillsArray(data.skills);
      }
    };
    getData();
  }, []);

  const btnClickHandler = async (e) => {
    const skillsAddBody = {
      skils_list: skills.join(","),
    };
    const data = await doPUTCall("users", skillsAddBody, requestHeader);
    if (data) {
      renderComponent(4);
    }
  };

  const skillHandler = (e) => {
    if (skills.includes(e.target.value)) {
      skills.splice(skills.indexOf(e.target.value), 1);
      setSkills(skills);
      setSkillCount(skillCount - 1);
      e.target.className = "skillBtn";
    } else {
      setSkills([...skills, e.target.value]);
      setSkillCount(skillCount + 1);
      e.target.className += " skillBtnActive";
    }
  };

  return (
    <div className="comp3Container">
      <h3 className="comp3h3">Selected Skills ({skillCount})</h3>
      <span className="comp3text">Skills are shown on your profile</span>
      <div className="skillContainer">
        {skillsArray.map((skill) => (
          <Button
            key={skill.skill_id}
            btnContent={skill.skill_name}
            className={"skillBtn"}
            onBtnClick={skillHandler}
            btnValue={skill.skill_id}
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
