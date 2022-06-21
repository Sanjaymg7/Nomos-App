import React, { useState, useEffect, useContext } from "react";
import { ModalContext } from "../../App";
import "./SkillAndCategoryForm.css";
import { skills, categories } from "../../Library/Constants";
import { getCall } from "../../Components/Services/DataFetch";
import Button from "../Button/Button";
import Modal from "../Modal/Modal";
import Loading from "../Loading/Loading";

const SkillAndCategoryForm = ({ component, handleSkillOrCategorySubmit }) => {
  const [dataArray, setdataArray] = useState([]);
  const [inputData, setInputData] = useState({
    dataId: [],
    dataName: [],
  });
  const [buttonData, setButtonData] = useState({
    value: "Next",
    isActive: false,
  });
  const [dataCount, setDataCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [modal, setModal] = useContext(ModalContext);

  const getData = async () => {
    try {
      if (component === "skills") {
        const data = await getCall(skills);
        if (data) {
          setdataArray(
            data.skills.map((skill) => ({ ...skill, isChecked: false }))
          );
        }
      } else {
        const data = await getCall(categories);
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
    } finally {
      setIsLoading(false);
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

  const validateData = () => {
    if (inputData.dataId !== "") {
      setButtonData({ ...buttonData, isActive: true });
    } else {
      setButtonData({ ...buttonData, isActive: false });
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
    validateData();
  };
  return (
    <div className="comp3Container">
      {modal.showModal && <Modal />}
      <h3 className="comp3h3">
        Selected {component} ({dataCount})
      </h3>
      <h4 className="comp3text">Please select required skills</h4>
      <div className="skillContainer">
        {isLoading ? (
          <div className="loadingContainer">
            <Loading />
          </div>
        ) : component === "skills" ? (
          dataArray.map((skill, index) => (
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
        ) : (
          dataArray.map((category, index) => (
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
          ))
        )}
      </div>
      <Button
        btnName={buttonData.value}
        className={buttonData.isActive ? "btnGreen" : "btnGrey"}
        btnDisable={buttonData.isActive ? false : true}
        onBtnClick={btnClickHandler}
      />
    </div>
  );
};

export default React.memo(SkillAndCategoryForm);
