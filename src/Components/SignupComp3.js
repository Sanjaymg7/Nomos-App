import React, { useState } from "react";
import Button from "./Button";
import "./SignupComp3.css";

const SignupComp3 = (props) => {
  let key = 0;
  const skillsArray = [
    "Home Repair & Odd jobs",
    "Performing Arts",
    "Art, Media and Design",
    "Professional Services",
    "Tech & Digital Services",
    "Travel and Transportation",
    "Community & Social Needs",
    "Tutoring Services",
    "Sport & Wellness",
    "Food & Beverage",
  ];
  const [skills, setSkills] = useState([]);
  const [skillCount, setSkillCount] = useState(0);
  const btnClickHandler = (e) => {
    console.log(skills);
    // props.compSubmit(4);
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
            key={key++}
            btnContent={skill}
            className={"skillBtn"}
            onBtnClick={skillHandler}
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
