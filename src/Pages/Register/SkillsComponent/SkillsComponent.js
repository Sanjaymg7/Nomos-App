import React, { useContext } from "react";
import { ModalContext } from "../../../App";
import { users } from "../../../Library/Constants";
import { putCall } from "../../../Components/Services/DataFetch";
import Modal from "../../../Components/Modal/Modal";
import SkillAndCategoryForm from "../../../Components/SkillAndCategoryForm/SkillAndCategoryForm";

const SkillsComponent = ({ renderComponent }) => {
  const [modal, setModal] = useContext(ModalContext);

  const btnClickHandler = async ([, skillsData]) => {
    try {
      const data = await putCall(users, {
        skils_list: skillsData,
      });
      if (data) {
        renderComponent("CommunityComponent");
      }
    } catch (err) {
      setModal({ modalContent: err, showModal: true });
    }
  };

  return (
    <div className="comp3Container">
      {modal.showModal && <Modal />}
      <SkillAndCategoryForm
        component={"skills"}
        handleSkillOrCategorySubmit={btnClickHandler}
      />
    </div>
  );
};

export default React.memo(SkillsComponent);
