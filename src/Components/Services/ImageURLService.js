import { getCall } from "./DataFetch";

export const imageURLService = async (fileExtension, file) => {
  if (fileExtension) {
    const getUploadData = await getCall(
      `upload/url?file_extension=${fileExtension}`
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
