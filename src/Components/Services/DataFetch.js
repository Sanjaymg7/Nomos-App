const url = "https://api2.juegogames.com/NOMOS-V3/";

const handleData = (data) => {
  if (data.responseCode === 200) {
    return data.responseData;
  } else {
    throw "Something went wrong!";
  }
};

const getCall = (
  endPoint,
  headers = { "content-type": "application/json" }
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
      throw "Something Went Wrong!!!";
    });
};

const putCall = (
  endPoint,
  body,
  headers = { "content-type": "application/json" }
) => {
  return fetch(url + endPoint, {
    method: "PUT",
    headers: headers,
    body: new URLSearchParams(body),
  })
    .then((response) => response.json())
    .then((data) => {
      return handleData(data);
    })
    .catch((err) => {
      throw "Something Went Wrong!!!";
    });
};

const postCall = (
  endPoint,
  body,
  headers = { "content-type": "application/json" }
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
      throw "Something Went Wrong!!!";
    });
};

export { getCall, putCall, postCall };
