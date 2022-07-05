import {
  errorMessage,
  successStatusCode,
  apiRetries,
} from "../Library/Constants";
import useLocalStorage from "./useLocalStorage";

// const url = "https://api.nomos.net/V4/";
const url = "https://api2.juegogames.com/NOMOS-V3/";

const useDataFetch = () => {
  //   const [retries, setRetries] = useState(apiRetries);
  const [access_token] = useLocalStorage("access_token");

  const handleData = (data) => {
    if (
      data.responseCode === successStatusCode ||
      data.status === successStatusCode
    ) {
      return data.responseData;
    } else {
      throw data.responseMessage;
    }
  };

  const handleError = (err) => {
    if (typeof err === "string") {
      throw err;
    } else {
      throw errorMessage;
    }
  };

  const getCall = (
    endPoint,
    headers = {
      "content-type": "application/json",
      access_token,
    },
    isExternal = false
  ) => {
    console.log(access_token);
    return fetch(isExternal ? endPoint : url + endPoint, {
      method: "GET",
      headers: headers,
    })
      .then((response) => (isExternal ? response : response.json()))
      .then((data) => {
        return handleData(data);
      })
      .catch((err) => {
        handleError(err);
      });
  };

  const putCall = (
    endPoint,
    body,
    headers = {
      "content-type": "application/json",
      access_token: access_token,
    },
    isExternal = false
  ) => {
    console.log(access_token);

    return fetch(isExternal ? endPoint : url + endPoint, {
      method: "PUT",
      headers: headers,
      body: isExternal ? body : new URLSearchParams(body),
    })
      .then((response) => {
        console.log("body", body);
        console.log("response", response);

        return isExternal ? response : response.json();
      })
      .then((data) => {
        console.log("put", data);
        return handleData(data);
      })
      .catch((err) => {
        handleError(err);
      });
  };

  const postCall = (
    endPoint,
    body,
    headers = {
      "content-type": "application/json",
      access_token,
    },
    isExternal = false
  ) => {
    return fetch(isExternal ? endPoint : url + endPoint, {
      headers: headers,
      method: "POST",
      body: new URLSearchParams(body),
    })
      .then((response) => (isExternal ? response : response.json()))
      .then((data) => {
        return handleData(data);
      })
      .catch((err) => {
        handleError(err);
      });
  };

  return [getCall, putCall, postCall];
};
export default useDataFetch;
