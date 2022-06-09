import React, { useState, useContext, useEffect } from "react";
import { PostContext } from "./Post";
import { requestHeader } from "../../Library/Constants";
import { getCall } from "../../Components/Services/DataFetch";
import Button from "../../Components/Button/Button";
import "./../Register/SkillsComponent/SkillsComponent.css";

const SkillsAndCategoryComponent = ({ renderComponent, component }) => {
  const [postData, setPostData] = useContext(PostContext);
  const [dataArray, setdataArray] = useState([]);
  const [inputData, setInputData] = useState({
    dataId: [],
    dataName: [],
  });
  const [dataCount, setDataCount] = useState(0);

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
      console.log(err);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const btnClickHandler = () => {
    const data = inputData.dataId.join(",");
    if (component === "skills") {
      setPostData({
        ...postData,
        skills_required: data,
        skills_array: inputData.dataName,
      });
    } else {
      setPostData({
        ...postData,
        category_required: data,
        categories_array: inputData.dataName,
      });
    }
    renderComponent("postData");
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
      <h3 className="comp3h3">
        Selected {component} ({dataCount})
      </h3>
      <span className="comp3text">Please select required skills</span>
      <div className="skillContainer">
        {component === "skills"
          ? dataArray.map((skill, index) => (
              <Button
                key={index}
                btnContent={skill.skill_name}
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
                btnContent={category.name}
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
        btnContent={"Next"}
        className={"btnGreen"}
        onBtnClick={btnClickHandler}
      />
    </div>
  );
};

export default React.memo(SkillsAndCategoryComponent);
