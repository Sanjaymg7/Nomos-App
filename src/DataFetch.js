const url = "https://api2.juegogames.com/NOMOS-V3/";

const handleData = (data) => {
  if (data.responseCode === 200) {
    return data.responseData;
  } else {
    alert(data.responseMessage);
    return false;
  }
};

const doGETCall = (
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
      alert(err);
      return false;
    });
};

const doGETCallWithBody = (
  endPoint,
  body,
  headers = { "content-type": "application/json" }
) => {
  return fetch(url + endPoint, {
    method: "GET",
    headers: headers,
    body: new URLSearchParams(body),
  })
    .then((res) => res.json())
    .then((data) => {
      return handleData(data);
    })
    .catch((err) => {
      alert(err);
      return false;
    });
};

const doPUTCall = (
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
      alert(err);
      return false;
    });
};

const doPOSTCall = (
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
      alert(err);
      return false;
    });
};

const doDELETECall = (
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
      alert(err);
      return false;
    });
};

export { doGETCall, doGETCallWithBody, doPUTCall, doPOSTCall, doDELETECall };
