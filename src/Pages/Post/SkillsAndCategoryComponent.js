import React, { useState, useEffect } from "react";
import { useCookies } from "react-cookie";
import { doGETCall } from "../../DataFetch";
import Button from "../../Components/Button";
import "./../Register/SkillsComponent.css";

const SkillsAndCategoryComponent = ({ handleData, component }) => {
  const [cookies, setCookie] = useCookies(["access_token"]);
  const initState = {
    dealing_type: 1,
    is_gift: false,
    items_service_name: "",
    items_service_desc: "",
    skills_required: "",
    category_required: "",
    location:
      '{"lat":12.9141417,"lng":74.8559568,"name":"Mangalore,Karnataka,India"}',
  };
  const requestHeader = {
    "content-type": "application/json",
    access_token: cookies.access_token,
  };

  const [postData, setPostData] = useState(
    JSON.parse(window.localStorage.getItem("postData")) || initState
  );
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
    if (component === "skills") {
      postData.skills_required = dataAddBody;
    } else {
      postData.category_required = dataAddBody;
    }
    window.localStorage.setItem("postData", JSON.stringify(postData));
    handleData(dataName);
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
