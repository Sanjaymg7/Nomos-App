import { getCall } from "../Components/Services/DataFetch";

export const getRequestHeader = () => ({
  "content-type": "application/json",
  access_token: localStorage.getItem("access_token"),
});

export const modalInitialState = {
  modalContent: "",
  showModal: false,
};

export const getImageURL = async (fileExtension, file) => {
  if (fileExtension) {
    const getUploadData = await getCall(
      `upload/url?file_extension=${fileExtension}`,
      getRequestHeader()
    );
    if (getUploadData) {
      const data = await fetch(getUploadData.upload_url, {
        method: "PUT",
        body: file,
      });
      if (data.status !== 200) {
        throw "Something went wrong!!!";
      } else {
        return getUploadData.image_id;
      }
    }
  } else {
    return "";
  }
};
