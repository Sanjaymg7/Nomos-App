import { getCall, putCall } from "./DataFetch";
import { fileUploadFail, requestHeader } from "../../Library/Constants";

export const imageURLService = async (fileExtensions, files) => {
  try {
    if (fileExtensions) {
      const getUploadData = await Promise.all(
        fileExtensions.map((fileExtension) =>
          getCall(`upload/url?file_extension=${fileExtension}`)
        )
      );
      if (getUploadData) {
        let uploadData = [];
        for (let i = 0; i < getUploadData.length; i++) {
          uploadData.push({
            upload_url: getUploadData[i].upload_url,
            file: files[i],
          });
        }
        await Promise.all(
          uploadData.map((imageData) =>
            putCall(imageData.upload_url, imageData.file, {}, true)
          )
        );
        return getUploadData.map((imageData) => imageData.image_id);
      } else {
        throw fileUploadFail;
      }
    }
  } catch (err) {
    throw err;
  }
};
