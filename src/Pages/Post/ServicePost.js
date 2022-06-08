import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import { doPOSTCall } from "../../DataFetch";
import Button from "../../Components/Button/Button";
import Input from "../../Components/Input/Input";
import "./ServicePost.css";

const ServicePost = ({ renderComponent, skills, categories }) => {
  const navigate = useNavigate();
  const [cookies, setCookie] = useCookies(["access"]);

  const initState = {
    dealing_type: 1,
    is_gift: false,
    items_service_name: "",
    items_service_desc: "",
    items_service_image: "",
    skills_required: "",
    category_required: "",
    location:
      '{"lat":12.9141417,"lng":74.8559568,"name":"Mangalore,Karnataka,India"}',
  };
  const requestHeader = {
    "content-type": "application/json",
    access_token: cookies.access,
  };
  let key = 0;
  let isBtnActive = false;
  const skillsName = skills || [];
  const categoriesName = categories || [];
  const [postData, setPostData] = useState(
    JSON.parse(window.localStorage.getItem("postData")) || initState
  );

  const enableCreatePostButton = () => {
    if (
      postData.items_service_name.trim() !== "" &&
      postData.items_service_desc.trim() !== "" &&
      postData.items_service_desc.trim().length < 201 &&
      postData.skills_required !== "" &&
      postData.category_required !== ""
    ) {
      isBtnActive = true;
    } else {
      isBtnActive = false;
    }
  };

  const handlePostTitle = (val) => {
    setPostData((prevState) => ({ ...prevState, items_service_name: val }));
  };

  const handleDescriptionChange = (val) => {
    if (val.length <= 200)
      setPostData((prevState) => ({ ...prevState, items_service_desc: val }));
  };

  const handlePostType = (val) => {
    setPostData((prevState) => ({ ...prevState, dealing_type: val }));
  };

  const addSkillandDescriptionHandler = (val) => {
    window.localStorage.setItem("postData", JSON.stringify(postData));
    renderComponent(val);
  };

  const handleGiftCheckChange = (val) => {
    setPostData((prevState) => ({ ...prevState, is_gift: val.checked }));
  };

  // const hanldeImageChange = (val) => {
  //   setPostData((prevState) => ({ ...prevState, items_service_image: val }));
  // };

  const createServicePost = async (e) => {
    e.preventDefault();
    // const uploadURL = e.target[5].value;
    // const fileExtension = uploadURL.slice(uploadURL.lastIndexOf(".") + 1);
    // const data = await doGETCallWithBody(
    //   `upload/url?file_extension=${fileExtension}`,
    //   { path: uploadURL },
    //   requestHeader
    // );
    // if (data) {
    //   console.log(data);
    // }
    e.target[4].innerHTML = "Please wait...";
    const data = await doPOSTCall("/service", postData, requestHeader);
    if (data) {
      localStorage.clear();
      navigate("/home");
    }
    e.target[4].innerHTML = "Create Post";
  };

  enableCreatePostButton();

  return (
    <div>
      <div className="headerConatiner">
        <span className="homeNavigate" onClick={() => navigate("/home")}>
          {"<"}
        </span>
        <span className="headerText">Give a Service</span>
      </div>
      <form onChange={enableCreatePostButton} onSubmit={createServicePost}>
        <div className="inputContainer">
          <span className="labelText">Post Type</span>
          <div className="postTypeButtons">
            <div
              className={
                postData.dealing_type === 1 ? "giveBtn postActive" : "giveBtn"
              }
              onClick={() => handlePostType(1)}
            >
              Give
            </div>
            <div
              className={
                postData.dealing_type === 1
                  ? "receiveBtn"
                  : "receiveBtn postActive"
              }
              onClick={() => handlePostType(2)}
            >
              Receive
            </div>
          </div>
          <div className="giftContainer">
            <span className="labelText">Gift</span>
            <input
              type={"checkbox"}
              className={"giftCheck"}
              checked={postData.is_gift}
              onChange={(e) => handleGiftCheckChange(e.target)}
            />
          </div>
          <span className="labelText">Post Title</span>
          <Input
            type={"text"}
            value={postData.items_service_name}
            className={"postTitleInput"}
            onInputChange={handlePostTitle}
          />
          <span className="labelText">Post Description</span>
          <div className="descriptionContainer">
            <textarea
              className="descriptionInput"
              value={postData.items_service_desc}
              rows="7"
              onChange={(e) => {
                handleDescriptionChange(e.target.value);
              }}
            ></textarea>
            <span className="descriptionCount">
              {postData.items_service_desc.length} / 200
            </span>
          </div>
          <span className="labelText">Post Image</span>
          <Input
            type={"file"}
            className={"postImageInput"}
            // value={postData.items_service_image}
            // onInputChange={hanldeImageChange}
          />
          <span className="labelText">Add Required Skills</span>
          <div
            className="addSkills"
            onClick={() => addSkillandDescriptionHandler(2)}
          >
            + Add Skill
          </div>
          {skillsName.map((skill) => (
            <span className="selectedSkills" key={key++}>
              {skill}
            </span>
          ))}
          <span className="labelText">Add Required Category</span>
          <div
            className="addCategory"
            onClick={() => addSkillandDescriptionHandler(3)}
          >
            + Add Category
          </div>
          {categoriesName.map((category) => (
            <span className="selectedSkills" key={key++}>
              {category}
            </span>
          ))}
          <Button
            btnContent={"Create Post"}
            className={
              isBtnActive ? "createPostBtn btnGreen" : "createPostBtn btnGrey"
            }
            btnDisable={isBtnActive ? false : true}
          />
        </div>
      </form>
    </div>
  );
};

export default React.memo(ServicePost);
