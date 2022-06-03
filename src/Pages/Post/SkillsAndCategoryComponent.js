import React, { useState, useEffect } from "react";
import { doGETCall } from "../../DataFetch";
import Button from "../../Components/Button";
import "./../Register/SkillsComponent.css";

const SkillsAndCategoryComponent = ({ handleData, component }) => {
  const requestHeader = {
    "content-type": "application/json",
    access_token:
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoyOTUsImlhdCI6MTY1NDI0MTQwNn0.fLe-hjqxHkbNbH_wr9ynKNOvcakk_vnYY3eiXQRK8Cs",
  };
  const [dataArray, setdataArray] = useState([]);
  const [dataId, setdataId] = useState([]);
  const [dataName, setdataName] = useState([]);
  const [dataCount, setDataCount] = useState(0);

  useEffect(() => {
    const getData = async () => {
      if (component === "skills") {
        const data = await doGETCall(`master/skills`, requestHeader);
        if (data) {
          setdataArray(data.skills);
        }
      } else {
        const data = await doGETCall(`master/categories`, requestHeader);
        if (data) {
          setdataArray(data.categories);
        }
      }
    };
    getData();
  }, []);

  const btnClickHandler = () => {
    const dataAddBody = dataId.join(",");
    const returnData = [dataAddBody, dataName];
    handleData(returnData);
  };

  const dataHandler = (e, id, name) => {
    if (dataName.includes(name) && dataId.includes(id)) {
      dataName.splice(dataName.indexOf(name), 1);
      dataId.splice(dataId.indexOf(id), 1);
      setdataName(dataName);
      setdataId(dataId);
      setDataCount(dataCount - 1);
      e.target.className = "skillBtn";
    } else {
      setdataName([...dataName, name]);
      setdataId([...dataId, id]);
      setDataCount(dataCount + 1);
      e.target.className += " skillBtnActive";
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
          ? dataArray.map((skill) => (
              <Button
                key={skill.skill_id}
                btnContent={skill.skill_name}
                className={"skillBtn"}
                onBtnClick={(e) =>
                  dataHandler(e, skill.skill_id, skill.skill_name)
                }
              />
            ))
          : dataArray.map((category) => (
              <Button
                key={category.category_id}
                btnContent={category.name}
                className={"skillBtn"}
                onBtnClick={(e) =>
                  dataHandler(e, category.category_id, category.name)
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
