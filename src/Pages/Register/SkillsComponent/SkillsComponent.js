import React, { useState } from "react";
import { modalInitialState } from "../../../Library/Constants";
import { getRequestHeader } from "../../../Library/Constants";
import { putCall } from "../../../Components/Services/DataFetch";
import Modal from "../../../Components/Modal/Modal";
import SkillAndCategoryForm from "../../../Components/SkillAndCategoryForm/SkillAndCategoryForm";

const SkillsComponent = ({ renderComponent }) => {
  const [modal, setModal] = useState(modalInitialState);

  const btnClickHandler = async ([, skillsData]) => {
    try {
      const data = await putCall(
        "users",
        {
          skils_list: skillsData,
        },
        getRequestHeader()
      );
      if (data) {
        renderComponent("CommunityComponent");
      }
    } catch (err) {
      setModal({ modalContent: "Error", showModal: true });
    }
  };

  return (
    <div className="comp3Container">
      {modal.showModal && (
        <Modal modalContent={modal.modalContent} closeModal={setModal} />
      )}
      <SkillAndCategoryForm
        component={"skills"}
        handleSkillOrCategorySubmit={btnClickHandler}
      />
    </div>
  );
};

export default React.memo(SkillsComponent);
