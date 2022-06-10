import React, { useState, useEffect } from "react";
import { modalInitialState } from "../../../Library/Constants";
import { requestHeader } from "../../../Library/Constants";
import { getCall, putCall } from "../../../Components/Services/DataFetch";
import Button from "../../../Components/Button/Button";
import "./SkillsComponent.css";
import Modal from "../../../Components/Modal/Modal";

const SkillsComponent = ({ renderComponent }) => {
  const [skillsArray, setSkillsArray] = useState([]);
  const [skills, setSkills] = useState([]);
  const [skillCount, setSkillCount] = useState(0);
  const [modal, setModal] = useState(modalInitialState);

  const handleCloseModal = (e) => {
    setModal(modalInitialState);
  };

  const getData = async () => {
    try {
      const data = await getCall("master/skills", requestHeader);
      if (data) {
        setSkillsArray(
          data.skills.map((skill) => ({ ...skill, isChecked: false }))
        );
      }
    } catch (err) {
      setModal({ modalContent: err, showModal: true });
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
      setModal({ modalContent: err, showModal: true });
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
      {modal.showModal && (
        <Modal
          modalContent={modal.modalContent}
          closeModal={handleCloseModal}
        />
      )}
      <h3 className="comp3h3">Selected Skills ({skillCount})</h3>
      <h4 className="comp3text">Skills are shown on your profile</h4>
      <div className="skillContainer">
        {skillsArray.map((skill, index) => (
          <Button
            key={index}
            btnName={skill.skill_name}
            className={skill.isChecked ? "skillBtn skillBtnActive" : "skillBtn"}
            onBtnClick={() => skillHandler(skill, index)}
          />
        ))}
      </div>
      <Button
        btnName={"Next"}
        className={"btnGreen"}
        onBtnClick={btnClickHandler}
      />
    </div>
  );
};

export default React.memo(SkillsComponent);
