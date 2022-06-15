import React, { useState, createContext } from "react";
import SkillAndCategoryForm from "../../Components/SkillAndCategoryForm/SkillAndCategoryForm";
import ItemPostInput from "./ItemPostInput";

export const ItemPostContext = createContext();

const ItemPost = () => {
  const initState = {
    dealing_type: 1,
    is_gift: false,
    items_service_name: "",
    items_service_desc: "",
    items_service_image: "",
    community_id: "",
    category_required: "",
    start_time: "",
    categories_array: [],
    location:
      '{"lat":12.9141417,"lng":74.8559568,"name":"Mangalore,Karnataka,India"}',
    image_url: "",
  };

  const [itemPostData, setItemPostData] = useState(initState);
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
      <ItemPostContext.Provider value={[itemPostData, setItemPostData]}>
        {componentState === "ItemPostInput" ? (
          <ItemPostInput renderComponent={renderComponent} />
        ) : (
          <SkillAndCategoryForm
            component={"category"}
            handleSkillOrCategorySubmit={handleSkillOrCategorySubmit}
          />
        )}
      </ItemPostContext.Provider>
    </div>
  );
};

export default ItemPost;
