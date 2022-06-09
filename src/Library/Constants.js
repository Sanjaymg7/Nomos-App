const getRequestHeader = () => ({
  "content-type": "application/json",
  access_token: localStorage.getItem("access_token"),
});

export const requestHeader = getRequestHeader();
export const modalInitialState = {
  modalContent: "",
  showModal: false,
};
