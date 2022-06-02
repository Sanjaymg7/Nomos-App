import React, { useState, useEffect } from "react";
import { doGETCall } from "../DataFetch";
import { doPUTCall } from "../DataFetch";
import Button from "./Button";
import "./SignupComp3.css";

const SignupComp3 = ({ renderSignupComponent, accessToken }) => {
  const requestHeader = {
    "content-type": "application/json",
    access_token: accessToken,
  };
  const [skillsArray, setSkillsArray] = useState([]);
  const [skills, setSkills] = useState([]);
  const [skillCount, setSkillCount] = useState(0);

  useEffect(() => {
    doGETCall("master/skills", requestHeader)
      .then((data) => {
        setSkillsArray(data.responseData.skills);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const btnClickHandler = (e) => {
    const skillsAddBody = {
      skils_list: skills.join(","),
    };
    doPUTCall("users", skillsAddBody, requestHeader)
      .then((data) => renderSignupComponent(4))
      .catch((err) => alert(err));
  };

  const skillHandler = (e) => {
    if (skills.includes(e.target.value)) {
      skills.splice(skills.indexOf(e.target.value), 1);
      setSkills((prevState) => {
        return skills;
      });
      setSkillCount((prevState) => {
        return prevState - 1;
      });
      e.target.className = "skillBtn";
    } else {
      setSkills((prevState) => {
        return [...prevState, e.target.value];
      });
      setSkillCount((prevState) => {
        return prevState + 1;
      });
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
        className={"signupThree"}
        onBtnClick={btnClickHandler}
      />
    </div>
  );
};

export default SignupComp3;
