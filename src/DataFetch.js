const url = "https://api2.juegogames.com/NOMOS-V3/";

const handleData = (data) => {
  if (data.responseCode === 200) {
    return data.responseData;
  } else {
    throw data.responseMessage;
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
      throw err;
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
      throw err;
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
      throw err;
    });
};

const deleteCall = (
  endPoint,
  headers = { "content-type": "application/json" }
) => {
  return fetch(url + endPoint, {
    method: "DELETE",
  })
    .then((res) => res.json())
    .then((data) => {
      return handleData(data);
    })
    .catch((err) => {
      throw err;
    });
};

export { getCall, putCall, postCall, deleteCall };
