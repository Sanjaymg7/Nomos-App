import React, { useState, useEffect } from "react";
import "../../Pages/Register/SkillsComponent/SkillsComponent.css";
import { modalInitialState, requestHeader } from "../../Library/Constants";
import { getCall } from "../../Components/Services/DataFetch";
import Button from "../Button/Button";
import Modal from "../Modal/Modal";

const SkillAndCategoryForm = ({ component, handleSkillOrCategorySubmit }) => {
  const [dataArray, setdataArray] = useState([]);
  const [inputData, setInputData] = useState({
    dataId: [],
    dataName: [],
  });
  const [dataCount, setDataCount] = useState(0);
  const [modal, setModal] = useState(modalInitialState);

  const handleCloseModal = (e) => {
    setModal(modalInitialState);
  };

  const getData = async () => {
    try {
      if (component === "skills") {
        const data = await getCall(`master/skills`, requestHeader);
        if (data) {
          setdataArray(
            data.skills.map((skill) => ({ ...skill, isChecked: false }))
          );
        }
      } else {
        const data = await getCall(`master/categories`, requestHeader);
        if (data) {
          setdataArray(
            data.categories.map((category) => ({
              ...category,
              isChecked: false,
            }))
          );
        }
      }
    } catch (err) {
      setModal({ modalContent: err, showModal: true });
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const btnClickHandler = () => {
    const data = inputData.dataId.join(",");
    if (component === "skills") {
      handleSkillOrCategorySubmit(["skills", data, inputData.dataName]);
    } else {
      handleSkillOrCategorySubmit(["category", data, inputData.dataName]);
    }
  };

  const dataHandler = (id, name, index) => {
    if (inputData.dataName.includes(name) && inputData.dataId.includes(id)) {
      inputData.dataName.splice(inputData.dataName.indexOf(name), 1);
      inputData.dataId.splice(inputData.dataId.indexOf(id), 1);
      setInputData({ dataId: inputData.dataId, dataName: inputData.dataName });
      setDataCount(dataCount - 1);
      dataArray[index].isChecked = false;
      setdataArray(dataArray);
    } else {
      setInputData({
        dataId: [...inputData.dataId, id],
        dataName: [...inputData.dataName, name],
      });
      setDataCount(dataCount + 1);
      dataArray[index].isChecked = true;
      setdataArray(dataArray);
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
      <h3 className="comp3h3">
        Selected {component} ({dataCount})
      </h3>
      <h4 className="comp3text">Please select required skills</h4>
      <div className="skillContainer">
        {component === "skills"
          ? dataArray.map((skill, index) => (
              <Button
                key={index}
                btnName={skill.skill_name}
                className={
                  skill.isChecked ? "skillBtn skillBtnActive" : "skillBtn"
                }
                onBtnClick={() =>
                  dataHandler(skill.skill_id, skill.skill_name, index)
                }
              />
            ))
          : dataArray.map((category, index) => (
              <Button
                key={category.category_id}
                btnName={category.name}
                className={
                  category.isChecked
                    ? "categoryBtn categoryBtnActive"
                    : "categoryBtn"
                }
                onBtnClick={() =>
                  dataHandler(category.category_id, category.name, index)
                }
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

export default SkillAndCategoryForm;
