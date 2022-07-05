import { getCall, putCall } from "./DataFetch";
import { fileUploadFail } from "../../Library/Constants";

export const imageURLService = async (fileExtension, file) => {
  try {
    if (fileExtension) {
      const getUploadData = await getCall(
        `upload/url?file_extension=${fileExtension}`
      );
      if (getUploadData) {
        await putCall(getUploadData.upload_url, file, {}, true);
        return getUploadData.image_id;
      }
    } else {
      throw fileUploadFail;
    }
  } catch (err) {
    throw err;
  }
};
