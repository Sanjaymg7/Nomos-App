import { errorMessage } from "../../Library/Constants";

// const url = "https://api.nomos.net/V4/";
const url = "https://api2.juegogames.com/NOMOS-V3/";

const handleData = (data) => {
  if (data.responseCode === 200 || data.status === 200) {
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
    access_token: localStorage.getItem("access_token"),
  }
) => {
  return fetch(url + endPoint, {
    method: "GET",
    headers: headers,
  })
    .then((res) => res.json())
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
  isImage = false,
  headers = {
    "content-type": "application/json",
    access_token: localStorage.getItem("access_token"),
  }
) => {
  return fetch(endPoint, {
    method: "PUT",
    headers: headers,
    body: new URLSearchParams(body),
  })
    .then((response) => (isImage ? response : response.json()))
    .then((data) => {
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
    access_token: localStorage.getItem("access_token"),
  }
) => {
  return fetch(url + endPoint, {
    headers: headers,
    method: "POST",
    body: new URLSearchParams(body),
  })
    .then((response) => response.json())
    .then((data) => {
      return handleData(data);
    })
    .catch((err) => {
      handleError(err);
    });
};

export { getCall, putCall, postCall };
