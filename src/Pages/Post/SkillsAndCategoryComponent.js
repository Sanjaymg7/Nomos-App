import React, { useState, useContext, useEffect } from "react";
import { PostContext } from "./Post";
import { useCookies } from "react-cookie";
import { getCall } from "../../DataFetch";
import Button from "../../Components/Button/Button";
import "./../Register/SkillsComponent.css";

const SkillsAndCategoryComponent = ({ renderComponent, component }) => {
  const [cookies] = useCookies(["access_token"]);
  const requestHeader = {
    "content-type": "application/json",
    access_token: cookies.access_token,
  };

  const [postData, setPostData] = useContext(PostContext);
  const [dataArray, setdataArray] = useState([]);
  const [dataId, setdataId] = useState([]);
  const [dataName, setdataName] = useState([]);
  const [dataCount, setDataCount] = useState(0);

  useEffect(() => {
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
    getData();
  }, []);

  const btnClickHandler = () => {
    const data = dataId.join(",");
    if (component === "skills") {
      setPostData({
        ...postData,
        skills_required: data,
        skills_array: dataName,
      });
    } else {
      setPostData({
        ...postData,
        category_required: data,
        categories_array: dataName,
      });
    }
    renderComponent("postData");
  };

  const dataHandler = (id, name, index) => {
    if (dataName.includes(name) && dataId.includes(id)) {
      dataName.splice(dataName.indexOf(name), 1);
      dataId.splice(dataId.indexOf(id), 1);
      setdataName(dataName);
      setdataId(dataId);
      setDataCount(dataCount - 1);
      dataArray[index].isChecked = false;
      setdataArray(dataArray);
    } else {
      setdataName([...dataName, name]);
      setdataId([...dataId, id]);
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
