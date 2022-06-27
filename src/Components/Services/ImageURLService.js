import { getCall } from "./DataFetch";
import { errorMessage } from "../../Library/Constants";

export const imageURLService = async (fileExtension, file) => {
  try {
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
          throw errorMessage;
        } else {
          return getUploadData.image_id;
        }
      }
    } else {
      return "";
    }
  } catch (err) {
    throw err;
  }
};
