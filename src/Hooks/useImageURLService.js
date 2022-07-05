import { fileUploadFail } from "../Library/Constants";
import useDataFetch from "./useDataFetch";
import useLocalStorage from "./useLocalStorage";
const useImageURLService = () => {
  const [getCall, putCall] = useDataFetch();
  const [access_token] = useLocalStorage("access_token");
  const imageURLService = async (fileExtension, file) => {
    console.log("Url service");
    try {
      if (fileExtension.length > 0) {
        console.log(fileExtension);
        const getUploadData = await getCall(
          `upload/url?file_extension=${fileExtension}`
        );
        if (getUploadData) {
          console.log("UploadURL", getUploadData);
          console.log("file", file);
          await putCall(
            getUploadData.upload_url,
            file,
            {
              "content-type": "application/json",
              access_token: access_token,
            },
            true
          );
          return getUploadData.image_id;
        }
      } else {
        console.log("fileUploadFail");
        throw fileUploadFail;
      }
    } catch (err) {
      console.log("catch error", err);
      throw err;
    }
  };
  return [imageURLService];
};
export default useImageURLService;
