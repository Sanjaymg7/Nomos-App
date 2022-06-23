import React, { useState } from "react";
import {
  PostContext,
  itemPostInitData,
} from "../../Components/Context/Context";
import SkillAndCategoryForm from "../../Components/SkillAndCategoryForm/SkillAndCategoryForm";
import ItemPostInput from "./ItemPostInput";

const ItemPost = () => {
  const [itemPostData, setItemPostData] = useState(itemPostInitData);
  const [componentState, setComponentState] = useState("ItemPostInput");

  const renderComponent = (state) => {
    setComponentState(state);
  };

  const handleSkillOrCategorySubmit = ([, data, dataNames]) => {
    setItemPostData({
      ...itemPostData,
      category_required: data,
      categories_array: dataNames,
    });
    renderComponent("ItemPostInput");
  };

  return (
    <div>
      <PostContext.Provider value={[itemPostData, setItemPostData]}>
        {componentState === "ItemPostInput" ? (
          <ItemPostInput renderComponent={renderComponent} />
        ) : (
          <SkillAndCategoryForm
            component={"category"}
            handleSkillOrCategorySubmit={handleSkillOrCategorySubmit}
          />
        )}
      </PostContext.Provider>
    </div>
  );
};

export default ItemPost;
