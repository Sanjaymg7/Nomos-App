import React from "react";
import Input from "../Input/Input";
import Label from "../Label/Label";
import "./PostTypeAndGiftForm.css";

const PostTypeAndGiftForm = ({
  postData,
  handlePostType,
  handleGiftCheckChange,
}) => {
  return (
    <div>
      <Label className="labelText" labelName="Post Type" />
      <div className="postTypeButtons">
        <div
          className={
            postData.dealing_type_value === 1 ? "giveBtn postActive" : "giveBtn"
          }
          onClick={() => handlePostType(1)}
        >
          {postData.giveLabel}
        </div>
        <div
          className={
            postData.dealing_type_value === 1
              ? "receiveBtn"
              : "receiveBtn postActive"
          }
          onClick={() => handlePostType(2)}
        >
          {postData.receiveLabel}
        </div>
      </div>
      <div className="giftContainer">
        <Label className="labelText" labelName="Gift" />
        <Input
          type={"checkbox"}
          className={"giftCheck"}
          isChecked={postData.is_gift_value}
          onInputChange={handleGiftCheckChange}
        />
      </div>
    </div>
  );
};

export default React.memo(PostTypeAndGiftForm);
