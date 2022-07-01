import React from "react";
import Input from "../Input/Input";
import Label from "../Label/Label";
import "./PostTypeAndGiftForm.css";

const PostTypeAndGiftForm = ({
  typeAndGiftData: {
    giveLabel,
    receiveLabel,
    dealing_type_value,
    is_gift_value,
    handlePostType,
    handleGiftCheckChange,
  },
}) => {
  return (
    <div>
      <Label className="labelText" labelName="Post Type" />
      <div className="postTypeButtons">
        <div
          className={
            dealing_type_value === 1 ? "giveBtn postActive" : "giveBtn"
          }
          onClick={() => handlePostType(1)}
        >
          {giveLabel}
        </div>
        <div
          className={
            dealing_type_value === 1 ? "receiveBtn" : "receiveBtn postActive"
          }
          onClick={() => handlePostType(2)}
        >
          {receiveLabel}
        </div>
      </div>
      <div className="giftContainer">
        <Label className="labelText" labelName="Gift" />
        <Input
          type={"checkbox"}
          className={"giftCheck"}
          isChecked={is_gift_value}
          onInputChange={handleGiftCheckChange}
        />
      </div>
    </div>
  );
};

export default React.memo(PostTypeAndGiftForm);
